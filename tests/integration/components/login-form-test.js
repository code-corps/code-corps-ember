import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{login-form}}`);

  assert.equal(this.$('.login-form').length, 1);
});

test('it renders required ui elements', function(assert) {
  this.render(hbs`{{login-form}}`);

  let $component = this.$('.login-form');
  assert.equal($component.find('form').length, 1, 'The form renders');

  let $form = $component.find('form');
  assert.equal($form.find('input#identification').length, 1, 'The identification field renders');
  assert.equal($form.find('input#password').length, 1, 'The password field renders');

  assert.equal($form.find('button#login').length, 1, 'The login button renders');
});
