import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import checkoutPage from '../pages/project/checkout';
import donatePage from '../pages/project/donate';
import signupPage from '../pages/signup';

moduleForAcceptance('Acceptance | Project - Donate');

test('Allows setting preset amount before continuing to checkout', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  project.createStripeConnectPlan({ project });

  donatePage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    donatePage.createDonation.setTo10.click();
    donatePage.createDonation.clickContinue();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.checkout', 'User was redirected to checkout');
    // we cannot check query params in a simple way, so we're asserting the UI
    // is correct instead
    assert.equal(
      checkoutPage.donationContainer.donationAmountText,
      '$10.00 given each month',
      'Donation amount is correct.'
    );
  });
});

test('Allows setting custom amount before continuing to checkout', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  project.createStripeConnectPlan({ project });

  donatePage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    donatePage.createDonation.customAmount(2.5);
    donatePage.createDonation.clickContinue();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.checkout', 'User was redirected to checkout');
    // we cannot check query params in a simple way, so we're asserting the UI
    // is correct instead
    assert.equal(
      checkoutPage.donationContainer.donationAmountText,
      '$2.50 given each month',
      'Donation amount is correct.'
    );
  });
});

test('Requires user to register before getting to checkout', function(assert) {
  assert.expect(5);

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  project.createStripeConnectPlan({ project });

  donatePage.visit({
    organization: organization.slug,
    project: project.slug
  });

  let email = 'joeuser@mail.com';

  andThen(() => {
    donatePage.createDonation.setTo10.click();
    donatePage.createDonation.clickContinue();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'signup', 'User was redirected to signup.');
    signupPage.form.username('joeuser');
    signupPage.form.keydownUsername();
    signupPage.form.email(email);
    signupPage.form.keydownEmail();
    signupPage.form.password('password');
    signupPage.form.save();
  });

  andThen(() => {
    // check user was created
    let user = server.schema.users.findBy({ email });
    assert.equal(user.state, 'signed_up', 'User was created with state set properly.');
    assert.equal(user.signUpContext, 'donation', 'User was created with context set properly.');

    // check we got redirected back
    assert.equal(currentRouteName(), 'project.checkout', 'User was redirected to checkout');

    // we cannot check query params in a simple way, so we're asserting the UI
    // is correct instead
    assert.equal(
      checkoutPage.donationContainer.donationAmountText,
      '$10.00 given each month',
      'Donation amount is correct.'
    );
  });
});

test('Requires user to register before getting to checkout, with custom amount', function(assert) {
  assert.expect(5);

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  project.createStripeConnectPlan({ project });

  donatePage.visit({
    organization: organization.slug,
    project: project.slug
  });

  let email = 'joeuser@mail.com';

  andThen(() => {
    donatePage.createDonation.customAmount(12.5);
    donatePage.createDonation.clickContinue();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'signup', 'User was redirected to signup.');
    signupPage.form.username('joeuser');
    signupPage.form.keydownUsername();
    signupPage.form.email(email);
    signupPage.form.keydownEmail();
    signupPage.form.password('password');
    signupPage.form.save();
  });

  andThen(() => {
    // check user was created
    let user = server.schema.users.findBy({ email });
    assert.equal(user.state, 'signed_up', 'User was created with state set properly.');
    assert.equal(user.signUpContext, 'donation', 'User was created with context set properly.');

    // check we got redirected back
    assert.equal(currentRouteName(), 'project.checkout', 'User was redirected to checkout');

    // we cannot check query params in a simple way, so we're asserting the UI
    // is correct instead
    assert.equal(
      checkoutPage.donationContainer.donationAmountText,
      '$12.50 given each month',
      'Donation amount is correct.'
    );
  });
});
