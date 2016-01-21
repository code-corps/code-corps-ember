import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-post-new-form', 'Integration | Component | project post new form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{project-post-new-form}}`);

  assert.equal(this.$('.project-post-new-form').length, 1, 'The component\'s element renders');
});
