import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('organization-settings-menu', 'Integration | Component | organization settings menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{organization-settings-menu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#organization-settings-menu}}
      template block text
    {{/organization-settings-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
