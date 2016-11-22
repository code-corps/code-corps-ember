import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import Mirage from 'ember-cli-mirage';

import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import projectDonatePage from '../pages/project/donate';

const {
  RSVP,
  Service
} = Ember;

// NOTE: Don't think these mocks can be moved, unless we can make them more generic than they are
// As is, they mock specifically the `stripe` injection for the project.donate controller

const stripeCardError = {
  error: {
    type: 'card_error',
    code: 'invalid_expiry_year',
    message: "Your card's expiration year is invalid.",
    param: 'exp_year'
  }
};

const stripeTokenResponse = {
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
};

const stripeMockSuccess = {
  card: {
    createToken: () => RSVP.resolve(stripeTokenResponse)
  }
};

const stripeMockFailure = {
  card: {
    createToken: () => RSVP.reject(stripeCardError)
  }
};

function stubStripe(context, mock) {
  let mockService = Service.create(mock);
  context.application.__container__.lookup('controller:project.donate').set('stripe', mockService);
}

moduleForAcceptance('Acceptance | Project - Donate');

test('It requires authentication', function(assert) {
  assert.expect(1);

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  projectDonatePage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('Allows adding a card and donating (creating a subscription)', function(assert) {
  assert.expect(8);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  projectDonatePage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectDonatePage.creditCard.cardNumber('4242-4242-4242-4242');
    projectDonatePage.creditCard.cardCVC('123');
    projectDonatePage.creditCard.cardMonth('12');
    projectDonatePage.creditCard.cardYear('2020');
  });

  andThen(() => {
    projectDonatePage.creditCard.clickSubmit();
  });

  andThen(() => {
    projectDonatePage.cardList.cards(0).clickCard();
    projectDonatePage.clickDonate();
  });

  andThen(() => {
    let customer = server.schema.stripePlatformCustomers.findBy({ email: user.email });
    assert.ok(customer, 'Customer was created with proper attributes.');
    assert.equal(customer.userId, user.id, 'Customer was assigned to current user');

    // we use attributes set in the mock stripe token response
    let card = server.schema.stripePlatformCards.findBy({ userId: user.id });
    assert.ok(card, 'Card was created with proper attributes.');
    assert.equal(card.userId, user.id, 'Card was assigned to current user');

    // amount is 1000, in cents
    let subscription = server.schema.stripeSubscriptions.findBy({ amount: 1000 });
    assert.ok(subscription, 'Subscription was created sucessfully.');
    assert.equal(subscription.userId, user.id, 'User was set to current user.');
    assert.equal(subscription.projectId, project.id, 'Project was set to current project.');
    assert.equal(currentRouteName(), 'project.thankyou', 'User was redirected to the thank you route.');
  });
});

test('Shows stripe errors when creating card token fails', function(assert) {
  assert.expect(3);

  stubStripe(this, stripeMockFailure);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  projectDonatePage.visit({
    amount: 10,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectDonatePage.creditCard.cardNumber('4242-4242-4242-4242');
    projectDonatePage.creditCard.cardCVC('123');
    projectDonatePage.creditCard.cardMonth('12');
    projectDonatePage.creditCard.cardYear('2020');
  });

  andThen(() => {
    projectDonatePage.creditCard.clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.donate');
    assert.equal(projectDonatePage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectDonatePage.errorFormatter.errors(0).message, stripeCardError.error.message, 'Correct error is displayed.');
  });
});

test('Shows validation errors when creating subscription fails', function(assert) {
  assert.expect(4);

  stubStripe(this, stripeMockSuccess);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  projectDonatePage.visit({
    amount: 0,
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectDonatePage.creditCard.cardNumber('4242-4242-4242-4242');
    projectDonatePage.creditCard.cardCVC('123');
    projectDonatePage.creditCard.cardMonth('12');
    projectDonatePage.creditCard.cardYear('2020');
  });

  andThen(() => {
    projectDonatePage.creditCard.clickSubmit();
  });

  andThen(() => {
    let done = assert.async();

    server.post('/stripe-subscriptions', function() {
      done();
      return new Mirage.Response(422, {}, {
        errors: [{
          id: 'VALIDATION_ERROR',
          source: { pointer: 'data/attributes/amount' },
          detail: 'is invalid',
          status: 422
        }]
      });
    });
    projectDonatePage.cardList.cards(0).clickCard();
    projectDonatePage.clickDonate();
  });

  andThen(() => {
    assert.notOk(server.schema.stripeSubscriptions.findBy({ amount: 1000 }), 'Subscription was not created.');
    assert.equal(currentRouteName(), 'project.donate');
    assert.equal(projectDonatePage.errorFormatter.errors().count, 1, 'Correct number of errors is displayed.');
    assert.equal(projectDonatePage.errorFormatter.errors(0).message, 'Amount is invalid', 'Correct error is displayed.');
  });
});
