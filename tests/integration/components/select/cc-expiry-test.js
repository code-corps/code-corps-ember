import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select/cc-expiry', 'Integration | Component | select/cc expiry', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select/cc-expiry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select/cc-expiry}}
      template block text
    {{/select/cc-expiry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
