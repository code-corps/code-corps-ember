import { setProperties } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import fundsRecipientComponent from '../../../pages/components/payments/funds-recipient';

let page = PageObject.create(fundsRecipientComponent);

function setHandlers(context, { detailsHandler = function() {}, documentHandler = function() {}, idHandler = function() {} }) {
  setProperties(context, { detailsHandler, documentHandler, idHandler });
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

  let stripeConnectAccount = { recipientStatus: 'pending_requirement' };
  this.set('stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  assert.ok(page.rendersPending, 'Component is rendered in pending mode.');
});

test('it renders correctly when "required"', function(assert) {
  assert.expect(2);

  let stripeConnectAccount = { recipientStatus: 'required' };
  this.set('stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  assert.ok(page.rendersRequired, 'Component is rendered in required mode.');
  assert.ok(page.rendersDetailsForm, 'Component renders the details form subcomponent.');
});

test('it renders correctly when "verifying" and document status "required"', function(assert) {
  assert.expect(3);

  let stripeConnectAccount = { recipientStatus: 'verifying' };
  this.set('stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  assert.ok(page.rendersVerifying, 'Component is rendered in verifying mode.');
  assert.ok(page.rendersVerificationDocument, 'Component renders the verification document subcomponent.');
  assert.ok(page.rendersLegalEntityPersonalIdNumber, 'Component renders the personal id number subcomponent.');
});

test('it renders correctly when "verified"', function(assert) {
  assert.expect(2);

  let stripeConnectAccount = {
    recipientStatus: 'verified',
    legalEntityFirstName: 'Joe',
    legalEntityLastName: 'Individual'
  };
  this.set('stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  assert.ok(page.rendersVerified, 'Component is rendered in verified mode.');
  assert.equal(page.individualNameText, 'Joe Individual', 'Component renders the name of the registered individual.');
});

test('it renders correctly when "verified" for company', function(assert) {
  assert.expect(3);

  let stripeConnectAccount = {
    recipientStatus: 'verified',
    legalEntityFirstName: 'Joe',
    legalEntityLastName: 'Individual',
    legalEntityBusinessName: 'Company Inc.',
    legalEntityType: 'company'
  };
  this.set('stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  assert.ok(page.rendersVerified, 'Component is rendered in verified mode.');
  assert.ok(page.individualNameText, 'Joe Individual', 'Component renders the name of the registered individual.');
  assert.ok(page.legalEntityBusinessNameText, 'Company Inc.', 'Component renders the name of the registered company.');
});

test('it passes out submit action from details subcomponent', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { recipientStatus: 'required' };
  this.set('stripeConnectAccount', stripeConnectAccount);

  function detailsHandler() {
    assert.ok(true, 'Action got called');
  }
  setHandlers(this, { detailsHandler });

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  page.detailsForm.clickSubmit();
});

// TODO: Get this working

// test('it passes out submit action from document upload subcomponent', function(assert) {
//   assert.expect(1);

//   let stripeConnectAccount = { recipientStatus: 'verifying', verificationDocumentStatus: 'required' };
//   this.set('stripeConnectAccount', stripeConnectAccount);

//   function documentHandler() {
//     assert.ok(true, 'Action got called');
//   };
//   setHandlers(this, { documentHandler });

// this.render(hbs`
//   {{payments/funds-recipient
//     stripeConnectAccount=stripeConnectAccount
//     onRecipientDetailsSubmitted=detailsHandler
//     onVerificationDocumentSubmitted=documentHandler
//     onLegalEntityPersonalIdNumberSubmitted=idHandler
//   }}
// `);

//   page.verificationDocument.pickFile(this);
// });

test('it passes out submit action from personal id number subcomponent', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { recipientStatus: 'verifying', personalIdNumberStatus: 'required' };
  this.set('stripeConnectAccount', stripeConnectAccount);

  function idHandler() {
    assert.ok(true, 'Action got called');
  }
  setHandlers(this, { idHandler });

  this.render(hbs`
    {{payments/funds-recipient
      stripeConnectAccount=stripeConnectAccount
      onRecipientDetailsSubmitted=detailsHandler
      onVerificationDocumentSubmitted=documentHandler
      onLegalEntityPersonalIdNumberSubmitted=idHandler
    }}
  `);

  page.legalEntityPersonalIdNumber.clickSubmit();
});
