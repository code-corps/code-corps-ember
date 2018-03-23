import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('styleguide/donations--create-donation', 'Integration | Component | styleguide/donations  create donation', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{styleguide/donations--create-donation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#styleguide/donations--create-donation}}
      template block text
    {{/styleguide/donations--create-donation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
