import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('styleguide/donations/show-donation', 'Integration | Component | styleguide/donations/show donation', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{styleguide/donations/show-donation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#styleguide/donations/show-donation}}
      template block text
    {{/styleguide/donations/show-donation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
