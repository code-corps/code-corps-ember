import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donation/credit-card', 'Integration | Component | donation/credit card', {
  integration: true
});

test('inputs can be disabled', function(assert) {
  assert.expect(3);
  this.set('canDonate', false);
  this.render(hbs`{{donation/credit-card canDonate=canDonate}}`);

  let inputs = this.$().find('input').get();

  inputs.forEach((input) => {
    assert.ok($(input).prop('disabled'));
  });
});

test('inputs are enabled by default', function(assert) {
  assert.expect(3);
  this.render(hbs`{{donation/credit-card}}`);

  let inputs = this.$().find('input').get();

  inputs.forEach((input) => {
    assert.notOk($(input).prop('disabled'));
  });
});
