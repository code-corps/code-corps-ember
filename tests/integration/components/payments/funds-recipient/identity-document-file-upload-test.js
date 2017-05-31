import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'code-corps-ember/initializers/ember-cli-mirage';
import Ember from 'ember';

import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/payments/funds-recipient/identity-document-file-upload';

const page = PageObject.create(component);
const template = hbs`{{
  payments/funds-recipient/identity-document-file-upload
  uploadStarted=onUploadStarted
  uploadProgress=onUploadProgress
  uploadDone=onUploadDone
  validationError=onValidationError
  uploadError=onUploadError
}}`;

const { set } = Ember;

const smallPNG = {
  name: 'file.png',
  type: 'image/png',
  size: 50,
  content: ''
};

const smallJPG = {
  name: 'file.jpg',
  type: 'image/jpg',
  size: 50,
  content: ''
};

const largePNG = {
  name: 'file.png',
  type: 'image/png',
  size: 50 * 1024 * 1024
};

const smallPDF = {
  name: 'file.pdf',
  type: 'text/pdf',
  size: 50
};

moduleForComponent(
  'payments/funds-recipient/identity-document-file-upload',
  'Integration | Component | payments/funds recipient/identity document file upload',
  {
    integration: true,
    beforeEach() {
      this.server = startMirage();
      page.setContext(this);
    },
    afterEach() {
      this.server.shutdown();
      page.removeContext();
    }
  }
);

function renderPage() {
  page.render(template);
}

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{payments/funds-recipient/identity-document-file-upload}}`);
  assert.equal(this.$('.identity-document-file-upload').length, 1);
});

test('it sends uploadStarted, uploadProgress, uploadDone actions on valid upload', function(assert) {
  assert.expect(3);

  let done = assert.async();

  set(this, 'onUploadStarted', function() {
    assert.ok(true, 'Upload start got called.');
  });

  set(this, 'onUploadProgress', function() {
    assert.ok(true, 'Upload progress got called.');
  });

  set(this, 'onUploadDone', function() {
    assert.ok(true, 'Upload done got called.');
    done();
  });

  renderPage();

  // we specify timing, so that the underlying pretender instance will do
  // progress updates as well
  this.server.post('https://uploads.stripe.com/v1/files', { id: 'abc123' }, { timing: 100 });

  page.selectFile(smallPNG);
});

test('it sends a validationError action if file is larger than 8mb', function(assert) {
  assert.expect(1);

  let done = assert.async();

  set(this, 'onValidationError', function() {
    assert.ok(true, 'Validation error got called.');
    done();
  });

  renderPage();

  page.selectFile(largePNG);
});

test('it sends a validationError action if file not a jpg or a png', function(assert) {
  // the assert should get called only once here, even though we handle the event twice
  assert.expect(1);

  let done = assert.async();

  set(this, 'onValidationError', function() {
    assert.ok(true, 'Validation error got called once.');
    done();
  });

  renderPage();

  this.server.post('https://uploads.stripe.com/v1/files', { id: 'ok' });

  page.selectFile(smallJPG);
  page.selectFile(smallPNG);
  page.selectFile(smallPDF);
});

test('it sends uploadError when there is a server issue', function(assert) {
  assert.expect(1);

  let done = assert.async();

  set(this, 'onUploadError', function() {
    assert.ok(true, 'Upload error got called.');
    done();
  });

  renderPage();

  // we specify timing, so that the underlying pretender instance will do
  // progress updates as well
  this.server.post('https://uploads.stripe.com/v1/files', { message: 'foo' }, 500);

  page.selectFile(smallPNG);
});
