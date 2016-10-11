import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { $ } = Ember;

moduleForComponent('submittable-textarea', 'Integration | Component | submittable textarea', {
  integration: true
});

let pressCtrlEnter = $.Event('keydown', {
  keyCode: 13,
  which: 13,
  ctrlKey: true
});

let pressCmdEnter = $.Event('keydown', {
  keyCode: 13,
  which: 13,
  metaKey: true
});

// This test is necessary because a new line after yield in the file will
// cause a new line in the textarea itself
test('it has no extra content when created', function(assert) {
  this.render(hbs`{{submittable-textarea}}`);

  assert.equal(this.$('textarea').val().trim(), '');
});

test('it sends the modifiedSubmit action with ctrl+enter', function(assert) {
  assert.expect(2);

  this.on('modifiedSubmit', () => {
    assert.ok(true);
  });
  this.render(hbs`{{submittable-textarea modifiedSubmit="modifiedSubmit"}}`);

  this.$('textarea').trigger(pressCtrlEnter);
  assert.equal(this.$('textarea').val().trim(), '');
});

test('it sends the modifiedSubmit action with cmd+enter', function(assert) {
  assert.expect(2);

  this.on('modifiedSubmit', () => {
    assert.ok(true);
  });
  this.render(hbs`{{submittable-textarea modifiedSubmit="modifiedSubmit"}}`);

  this.$('textarea').trigger(pressCmdEnter);
  assert.equal(this.$('textarea').val().trim(), '');
});
