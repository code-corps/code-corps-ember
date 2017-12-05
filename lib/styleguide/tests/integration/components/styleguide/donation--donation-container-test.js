import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('styleguide/donation--donation-container', 'Integration | Component | styleguide/donation  donation container', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{styleguide/donation--donation-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#styleguide/donation--donation-container}}
      template block text
    {{/styleguide/donation--donation-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
