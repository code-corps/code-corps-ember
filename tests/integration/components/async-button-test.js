import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('async-button', 'Integration | Component | async button', {
  integration: true
});

test('button calls submit action', function(assert) {
  assert.expect(1);
  this.disabled = false;
  this.on('saveAction', () => {
    this.set('disabled', true);
    assert.ok(true, 'this action is only called once');
  });

  this.render(hbs`{{async-button submitAction=(action "saveAction") disabled=disabled}}`);
  this.$('input').click();

  run(() => {
    this.$('input').click();
  });
});
