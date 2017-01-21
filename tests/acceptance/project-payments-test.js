import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateAsMemberOfRole } from 'code-corps-ember/tests/helpers/authentication';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import Mirage from 'ember-cli-mirage';
import page from '../pages/project/settings/donations/payments';

moduleForAcceptance('Acceptance | Project Payments');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  page.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'User was redirected to project route');
  });
});

test('it redirects to project list page if user is not allowed to setup the account', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  authenticateAsMemberOfRole(this.application, server, organization, 'admin');

  page.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'User was redirected to project list route');
  });
});

test('The full setup works properly', function(assert) {
  assert.expect(12);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  authenticateAsMemberOfRole(this.application, server, organization, 'owner');

  page.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.ok(page.accountSetup.rendersCreateAccount, 'There is no stripe connect account, so the create account form is rendered');
    assert.ok(page.accountSetup.createAccount.hasRequiredStatus, 'Create account has required status');

    // need to mock changes in account setup status for which the API is in charge of
    server.post('stripe-connect-accounts', function(schema) {
      let attributes = this.normalizedRequestAttrs();
      attributes.recipientStatus = 'required';
      return schema.stripeConnectAccounts.create(attributes);
    });

    page.accountSetup.createAccount.clickSubmit();
  });

  andThen(() => {
    assert.ok(page.accountSetup.createAccount.hasVerifiedStatus, 'Create account has verified status');
    assert.ok(page.accountSetup.rendersFundsRecipient, 'There is now a stripe connect account, so we render funds recipient');
    assert.ok(page.accountSetup.fundsRecipient.rendersDetailsForm, 'The details form part of the UI is rendered');

    // now we need to mock a patch that changes status to require a document
    server.patch('stripe-connect-accounts/:id', function(schema) {
      let attributes = this.normalizedRequestAttrs();
      attributes.recipientStatus = 'verifying';
      attributes.verificationDocumentStatus = 'required';

      let account = schema.stripeConnectAccounts.find(attributes.id);
      account._setupAttrs(attributes);

      return account.save();
    });

    let { detailsForm } = page.accountSetup.fundsRecipient;

    detailsForm
      .selectCompany()
      .legalEntityBusinessName('Some Business Inc.')
      .legalEntityBusinessTaxId('TAX-123')
      .legalEntityFirstName('John')
      .legalEntityLastName('Doe')
      .legalEntityAddressLine1('Some Street, 42')
      .legalEntityAddressLine2('PO 22')
      .legalEntityAddressCity('Some City')
      .legalEntityAddressPostalCode('12345')
      .legalEntitySsnLast4('4321');

    detailsForm.state.fillIn('CA');
    detailsForm.country.fillIn('USA');
    detailsForm.birthDate.day.fillIn(1);
    detailsForm.birthDate.month.fillIn(12);
    detailsForm.birthDate.year.fillIn(1990);

    detailsForm.clickSubmit();
  });

  andThen(() => {
    assert.ok(page.accountSetup.rendersFundsRecipient, 'We are still on the funds recipient step');
    assert.ok(page.accountSetup.fundsRecipient.rendersVerificationDocumentRequired, 'We are on the verification document substep');

    // need to mock changing the verification document status now,
    // but we don't know how to select a file to upload
    server.patch('stripe-connect-accounts/:id', function(schema) {
      let attributes = this.normalizedRequestAttrs();
      attributes.recipientStatus = 'verifying';
      attributes.verificationDocumentStatus = 'verified';
      attributes.personalIdNumberStatus = 'required';

      let account = schema.stripeConnectAccounts.find(attributes.id);
      account._setupAttrs(attributes);

      return account.save();
    });

    // since we can't (or don't know how to) mock a file upload
    // we instead trigger the final controller action involved in the process
    //
    // TODO:
    // We are skipping a moderately large part of the chain here
    // We should look into skipping less, somehow
    this.application.__container__
      .lookup('controller:project.settings.donations.payments')
      .send('onVerificationDocumentSubmitted', 'test_id');
  });

  andThen(() => {
    assert.ok(page.accountSetup.rendersFundsRecipient, 'We are still on the funds recipient step');
    assert.ok(page.accountSetup.fundsRecipient.rendersLegalEntityPersonalIdNumberRequired, 'We are on the personal id number substep');

    page.accountSetup.fundsRecipient.legalEntityPersonalIdNumber.legalEntityPersonalIdNumber('4321-1234');

    // need to also mock the stripe token create response
    server.post('https://api.stripe.com/v1/tokens', function() {
      return new Mirage.Response(201, {}, { id: 'tok_123' });
    });

    // need to mock submiting a personal id number now
    // now we need to mock a patch that changes status to require a document
    server.patch('stripe-connect-accounts/:id', function(schema) {
      let attributes = this.normalizedRequestAttrs();
      attributes.recipientStatus = 'verified';
      attributes.verificationDocumentStatus = 'verified';
      attributes.personalIdNumberStatus = 'verified';
      attributes.bankAccountStatus = 'required';

      let account = schema.stripeConnectAccounts.find(attributes.id);
      account._setupAttrs(attributes);
      return account.save();
    });

    page.accountSetup.fundsRecipient.legalEntityPersonalIdNumber.clickSubmit();
  });

  andThen(() => {
    assert.ok(page.accountSetup.rendersBankAccountRequired, 'We are now on the bank account step');

    server.patch('stripe-connect-accounts/:id', function(schema) {
      let attributes = this.normalizedRequestAttrs();
      attributes.bankAccountStatus = 'verified';

      let account = schema.stripeConnectAccounts.find(attributes.id);
      account._setupAttrs(attributes);
      return account.save();
    });

    page.accountSetup.bankAccount
      .accountNumber('111111')
      .routingNumber('222222')
      .clickSubmit();
  });

  andThen(() => {
    assert.ok(page.accountSetup.rendersFundsRecipientVerified, 'Funds recipient is rendered as verified.');
    assert.ok(page.accountSetup.rendersBankAccountVerified, 'Bank account is rendered as verified');
  });
});
