import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sg/donation--card-logos', 'Integration | Component | sg/donation  card logos', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sg/donation--card-logos}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sg/donation--card-logos}}
      template block text
    {{/sg/donation--card-logos}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
