import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('styleguide/donation--card-item', 'Integration | Component | styleguide/donation  card item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{styleguide/donation--card-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#styleguide/donation--card-item}}
      template block text
    {{/styleguide/donation--card-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
