import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import verificationDocumentComponent from 'code-corps-ember/tests/pages/components/payments/funds-recipient/verification-document';

let page = PageObject.create(verificationDocumentComponent);

moduleForComponent('payments/funds-recipient/verification-document', 'Integration | Component | payments/funds recipient/verification document', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders nothing if status is not "required" or "verifying"', function(assert) {
  assert.expect(1);

  this.set('stripeConnectAccount', { verificationDocumentStatus: 'pending_required' });

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.equal(page.text, '', 'Nothing is rendered');
});

test('it renders file upload subcomponent if status is "required"', function(assert) {
  assert.expect(1);

  this.set('stripeConnectAccount', { verificationDocumentStatus: 'required' });

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.ok(page.rendersFileUpload, 'File upload subcomponent is rendered');
});

test('it renders information if stautus is "verifying"', function(assert) {
  assert.expect(1);

  this.set('stripeConnectAccount', { verificationDocumentStatus: 'verifying' });

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.equal(page.text, 'Please be patient while we review the document you provided.', 'Info text is rendered');
});

test('it shows as busy if busy', function(assert) {
  assert.expect(1);

  this.set('stripeConnectAccount', { verificationDocumentStatus: 'required' });
  this.set('isBusy', true);

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.equal(page.text, 'Processing...', 'Only a busy indicator is rendered.');
});

test('it shows the progress message when uploading', function(assert) {
  assert.expect(1);

  this.set('stripeConnectAccount', { verificationDocumentStatus: 'required' });
  this.set('isUploading', true);
  this.set('progressPercentage', 20);

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.equal(page.text, 'Uploading... 20', 'Progress message is rendered');
});

test('it shows errors if any', function(assert) {
  assert.expect(1);
  this.set('stripeConnectAccount', { verificationDocumentStatus: 'required' });
  this.set('error', 'Lorem ipsum');

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.equal(page.error.text, 'Lorem ipsum', 'Error is rendered');
});

test('it renders Stripe error correctly', function(assert) {
  assert.expect(2);
  this.set('stripeConnectAccount', { verificationDocumentStatus: 'errored' });

  this.render(hbs`
    {{payments/funds-recipient/verification-document
      error=error
      isBusy=isBusy
      isUploading=isUploading
      progressPercentage=progressPercentage
      stripeConnectAccount=stripeConnectAccount}}
  `);

  assert.ok(page.error.isVisible, 'Error is rendered');
  assert.ok(page.rendersFileUpload, 'File upload subcomponent is rendered');
});

// TODO: Figure out how to write these
// test('it sends out 'onVerificationDocumentUploaded' action when upload by subcomponent is done', function(assert) {})
