import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('styleguide/donations/donation-progress', 'Integration | Component | styleguide/donations/donation progress', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{styleguide/donations/donation-progress}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#styleguide/donations/donation-progress}}
      template block text
    {{/styleguide/donations/donation-progress}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
