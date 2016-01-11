import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{login-form}}`);

  assert.equal(this.$('.login-form').length, 1);
});

