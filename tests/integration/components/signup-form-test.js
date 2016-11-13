import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('signup-form', 'Integration | Component | signup form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{signup-form}}`);

  assert.equal(this.$('.signup-form').length, 1);
});

test('it renders required ui elements', function(assert) {
  this.render(hbs`{{signup-form}}`);

  let $component = this.$('.signup-form');
  assert.equal($component.find('form').length, 1, 'The form renders');

  let $form = $component.find('form');
  assert.equal($form.find('input[name=username]').length, 1, 'The username field renders');
  assert.equal($form.find('input[name=email]').length, 1, 'The email field renders');
  assert.equal($form.find('input[name=password]').length, 1, 'The password field renders');

  assert.equal($form.find('input[name=signup]').length, 1, 'The signup button renders');
});
