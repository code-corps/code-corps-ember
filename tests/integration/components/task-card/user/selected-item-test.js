import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('task-card/user/selected-item', 'Integration | Component | task card/user/selected item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{task-card/user/selected-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#task-card/user/selected-item}}
      template block text
    {{/task-card/user/selected-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
