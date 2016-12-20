import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('identity-document-file-upload', 'Integration | Component | identity document file upload', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{payments/funds-recipient/identity-document-file-upload}}`);
  assert.equal(this.$('.identity-document-file-upload').length, 1);
});

// TODO: figure out how to write these. Might require unit testing instead
// test('it sends an uploadStarted action when upload starts', function(assert) {});
// test('it sends a validationError action if file is larger than 8mb', function(assert) {});
// test('it sends a validationError action if file is not jpg or png', function(assert) {});
// test('it sends an uploadError action if file upload fails due to stripe', function(assert) {});
// test('it updates on upload progress', function(assert) {});
// test('it sends an uploadDone action with the stripe file id when done uploading', function(assert) {});
