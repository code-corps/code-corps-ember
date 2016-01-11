import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('signup-form', 'Integration | Component | signup form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{signup-form}}`);

  assert.equal(this.$('.signup-form').length, 1);
});


test('it renders required ui elements', function(assert) {
  this.render(hbs`{{signup-form}}`);

  let $component = this.$('.signup-form');
  assert.equal($component.find('form').length, 1, 'The form renders');

  let $form = $component.find('form');
  assert.equal($form.find('[name=username]').length, 1, 'The username field renders');
  assert.equal($form.find('[name=email]').length, 1, 'The email field renders');
  assert.equal($form.find('[name=password]').length, 1, 'The password field renders');
});
