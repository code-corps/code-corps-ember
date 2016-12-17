import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import fundsRecipientComponent from '../../../pages/components/payments/funds-recipient';

let page = PageObject.create(fundsRecipientComponent);

const {
  setProperties,
  K
} = Ember;

function setHandlers(context, { detailsHandler = K, documentHandler = K, idHandler = K }) {
  setProperties(context, { detailsHandler, documentHandler, idHandler });
}

function renderPage() {
  page.render(
    hbs`{{payments/funds-recipient
          account=account
          onRecipientDetailsSubmitted=detailsHandler
          onVerificationDocumentSubmitted=documentHandler
          onPersonalIdNumberSubmitted=idHandler}}`
  );
}

moduleForComponent('payments/funds-recipient', 'Integration | Component | payments/funds recipient', {
  integration: true,
  beforeEach() {
    setHandlers(this, {});
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders correctly when "pending"', function(assert) {
  assert.expect(1);

  let account = { recipientStatus: 'pending_requirement' };
  this.set('account', account);

  renderPage();

  assert.ok(page.rendersPending, 'Component is rendered in pending mode.');
});

test('it renders correctly when "required"', function(assert) {
  assert.expect(2);

  let account = { recipientStatus: 'required' };
  this.set('account', account);

  renderPage();

  assert.ok(page.rendersRequired, 'Component is rendered in required mode.');
  assert.ok(page.rendersDetailsForm, 'Component renders the details form subcomponent.');
});

test('it renders correctly when "verifying"', function(assert) {
  assert.expect(3);

  let account = { recipientStatus: 'verifying' };
  this.set('account', account);

  renderPage();

  assert.ok(page.rendersVerifying, 'Component is rendered in verifying mode.');
  assert.ok(page.rendersVerificationDocument, 'Component renders the verification document subcomponent.');
  assert.ok(page.rendersPersonalIdNumber, 'Component renders the personal id number subcomponent.');
});

test('it renders correctly when "verified"', function(assert) {
  assert.expect(2);

  let account = {
    recipientStatus: 'verified',
    individualName: 'Joe Individual'
  };
  this.set('account', account);

  renderPage();

  assert.ok(page.rendersVerified, 'Component is rendered in verified mode.');
  assert.equal(page.individualNameText, 'Joe Individual', 'Component renders the name of the registered individual.');
});

test('it renders correctly when "verified" for business', function(assert) {
  assert.expect(3);

  let account = {
    recipientStatus: 'verified',
    individualName: 'Joe Individual',
    businessName: 'Company Inc.',
    recipientType: 'business'
  };
  this.set('account', account);

  renderPage();

  assert.ok(page.rendersVerified, 'Component is rendered in verified mode.');
  assert.ok(page.individualNameText, 'Joe Individual', 'Component renders the name of the registered individual.');
  assert.ok(page.businessNameText, 'Company Inc.', 'Component renders the name of the registered business.');
});

// TODO: These need to be implemented once subcomponents are done and pass out actions
// test('it passes out submit action from details subcomponent', function(assert) {
//   assert.expect(1);

//   let account = { recipientStatus: 'required' };
//   this.set('account', account);

//   renderPage();
// });

// test('it passes out submit action from document upload subcomponent', function(assert) {
//   assert.expect(1);

//   let account = { recipientStatus: 'verifying' };
//   this.set('account', account);

//   renderPage();
// });

// test('it passes out submit action from personal id number subcomponent', function(assert) {
//   assert.expect(1);

//   let account = { recipientStatus: 'verifying' };
//   this.set('account', account);

//   renderPage();
// });
