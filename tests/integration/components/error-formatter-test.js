import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Object } = Ember;

moduleForComponent('error-formatter', 'Integration | Component | error formatter', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{error-formatter}}`);
  assert.equal(this.$('.error-formatter').length, 1, "The component's element renders");
});

let mockResponseWithMultipleErrors = Object.create({
  errors: [
    { title: 'First', detail: 'error' },
    { title: 'Second', detail: 'error' }
  ]
});

test('it displays a message for each error in the response', function(assert) {
  assert.expect(3);

  this.set('error', mockResponseWithMultipleErrors);
  this.render(hbs`{{error-formatter error=error}}`);
  assert.equal(this.$('.error-formatter .error').length, 2, 'Each error message is rendered');
  assert.equal(this.$('.error-formatter .error:eq(0)').text().trim(), 'First: error', 'First message is rendered');
  assert.equal(this.$('.error-formatter .error:eq(1)').text().trim(), 'Second: error', 'Second message is rendered');
});

test('it displays a default message if there are no errors in the response', function(assert) {
  assert.expect(2);

  this.set('error', {});
  this.render(hbs`{{error-formatter error=error}}`);
  assert.equal(this.$('.error-formatter .error').length, 1, 'Each error message is rendered');
  assert.equal(this.$('.error-formatter .error:eq(0)').text().trim(), 'An unexpected error has occured', 'Default message is rendered');
});
