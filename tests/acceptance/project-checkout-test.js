import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import Mirage from 'ember-cli-mirage';

import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';
import projectCheckoutPage from '../pages/project/checkout';
import signupPage from '../pages/signup';

const {
  RSVP,
  Service
} = Ember;

// NOTE: Don't think these mocks can be moved, unless we can make them more generic than they are
// As is, they mock specifically the `stripe` injection for the project.checkout controller

const stripeCardError = {
  error: {
    type: 'card_error',
    code: 'invalid_expiry_year',
    message: "Your card's expiration year is invalid.",
    param: 'exp_year'
  }
};

const stripeTokenResponse = {
  token: {
    id: 'tok_something', // Token identifier
    card: { // Dictionary of the card used to create the token
      name: null,
      address_line1: '12 Main Street',
      address_line2: 'Apt 42',
      address_city: 'Palo Alto',
      address_state: 'CA',
      address_zip: '94301',
      address_country: 'US',
      country: 'US',
      exp_month: 2,
      exp_year: 2017,
      last4: '4242',
      object: 'card',
      brand: 'Visa',
      funding: 'credit'
    },
    created: 1478892395, // Timestamp of when token was created
    livemode: true, // Whether this token was created with a live API key
    type: 'card',
    object: 'token', // Type of object, always "token"
    used: false // Whether this token has been used
  }
};

const stripeMockSuccess = {
  createToken: () => RSVP.resolve(stripeTokenResponse)
};

const stripeMockFailure = {
  createToken: () => RSVP.reject(stripeCardError)
};

function stubStripe(context, mock) {
  let mockService = Service.create(mock);
  context.application.__container__.lookup('controller:project.checkout').set('stripev3', mockService);
}

moduleForAcceptance('Acceptance | Project - Checkout');

test('It redirects to project route if already a subscriber, with a flash', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  project.createStripeConnectPlan({ project });

  server.create('stripeConnectSubscription', { project, user });

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown.');
    assert.equal(currentRouteName(), 'project.index', 'User was redirected to index');
  });
});

test('Allows creating a card and donating (creating a subscription)', function(assert) {
  assert.expect(8);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });
  project.createStripeConnectPlan();

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    let customer = server.schema.stripePlatformCustomers.findBy({ email: user.email });
    assert.ok(customer, 'Customer was created with proper attributes.');
    assert.equal(customer.userId, user.id, 'Customer was assigned to current user');

    // we use attributes set in the mock stripe token response
    let card = server.schema.stripePlatformCards.findBy({ userId: user.id });
    assert.ok(card, 'Card was created with proper attributes.');
    assert.equal(card.userId, user.id, 'Card was assigned to current user');

    // quantity is 1000, in cents
    let subscription = server.schema.stripeConnectSubscriptions.findBy({ quantity: 1000 });
    assert.ok(subscription, 'Subscription was created sucessfully.');
    assert.equal(subscription.userId, user.id, 'User was set to current user.');
    assert.equal(subscription.projectId, project.id, 'Project was set.');
    assert.equal(currentRouteName(), 'project.thank-you', 'User was redirected to the thank you route.');
  });
});

test('Allows signing up and donating', function(assert) {
  assert.expect(8);

  stubStripe(this, stripeMockSuccess);

  let organization = server.create('organization');
  let project = server.create('project', { organization });
  project.createStripeConnectPlan();

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  let email = 'joe@mail.com';

  andThen(() => {
    assert.equal(currentRouteName(), 'signup', 'User was redirected to signup.');
    signupPage.form.email(email);
    signupPage.form.password('password');
    signupPage.form.username('joeuser');
    signupPage.form.save();
  });

  andThen(() => {
    let user = server.schema.users.findBy({ email });
    assert.equal(user.state, 'signed_up_donating', 'User was created with state set properly.');
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    let userId = server.schema.users.findBy({ email }).id;
    assert.ok(server.schema.stripePlatformCustomers.findBy({ userId }), 'Customer was created.');

    // we use attributes set in the mock stripe token response
    assert.ok(server.schema.stripePlatformCards.findBy({ userId }), 'Card was created.');

    // quantity is 1000, in cents
    let subscription = server.schema.stripeConnectSubscriptions.findBy({ userId });
    assert.ok(subscription, 'Subscription was created.');
    assert.equal(subscription.quantity, 1000, 'Subscription has correct value.');
    assert.equal(subscription.projectId, project.id, 'Project was set.');
    assert.equal(currentRouteName(), 'project.thank-you', 'User was redirected to the thank you route.');
  });
});

test('Shows stripe errors when creating a card token fails', function(assert) {
  assert.expect(3);

  stubStripe(this, stripeMockFailure);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.checkout');
    assert.equal(projectCheckoutPage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectCheckoutPage.errorFormatter.errors(0).message, stripeCardError.error.message, 'Correct error is displayed.');
  });
});

test('Shows error indicating problem with stripe customer if that part of the process fails', function(assert) {
  assert.expect(3);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  server.post('/stripe-platform-customers', function() {
    return new Mirage.Response(500, {}, {
      errors: [{
        id: 'INTERNAL_SERVER_ERROR',
        title: 'Internal server error',
        detail: 'is invalid',
        status: 500
      }]
    });
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.checkout');
    assert.equal(projectCheckoutPage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectCheckoutPage.errorFormatter.errors(0).message, 'There was a problem in connecting your account with our payment processor. Please try again.');
  });
});

test('Shows error indicating problem with stripe card if that part of the process fails', function(assert) {
  assert.expect(3);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  server.post('/stripe-platform-cards', function() {
    return new Mirage.Response(500, {}, {
      errors: [{
        id: 'INTERNAL_SERVER_ERROR',
        title: 'Internal server error',
        detail: 'is invalid',
        status: 500
      }]
    });
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.checkout');
    assert.equal(projectCheckoutPage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectCheckoutPage.errorFormatter.errors(0).message, 'There was a problem in using your payment information. Please try again.');
  });
});

test('Shows subscription validation errors if that part of the process fails due to validation', function(assert) {
  assert.expect(4);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  projectCheckoutPage.visit({
    amount: 0,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    server.post('/stripe-connect-subscriptions', function() {
      return new Mirage.Response(422, {}, {
        errors: [{
          id: 'VALIDATION_ERROR',
          source: { pointer: 'data/attributes/quantity' },
          detail: 'is invalid',
          status: 422
        }]
      });
    });
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    assert.notOk(server.schema.stripeConnectSubscriptions.findBy({ quantity: 1000 }), 'Subscription was not created.');
    assert.equal(currentRouteName(), 'project.checkout');
    assert.equal(projectCheckoutPage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectCheckoutPage.errorFormatter.errors(0).message, "The amount you've set for your monthly donation is invalid.", 'Correct error is displayed.');
  });
});

test('Shows error indicating problem with creating subscription if that part of the process fails', function(assert) {
  assert.expect(3);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  projectCheckoutPage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  server.post('/stripe-connect-subscriptions', function() {
    return new Mirage.Response(500, {}, {
      errors: [{
        id: 'INTERNAL_SERVER_ERROR',
        title: 'Internal server error',
        detail: 'is invalid',
        status: 500
      }]
    });
  });

  andThen(() => {
    projectCheckoutPage.donationContainer.clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.checkout');
    assert.equal(projectCheckoutPage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectCheckoutPage.errorFormatter.errors(0).message, 'There was a problem in setting up your monthly donation. Please try again.');
  });
});
