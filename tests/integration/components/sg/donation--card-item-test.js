import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sg/donation--card-item', 'Integration | Component | sg/donation  card item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sg/donation--card-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sg/donation--card-item}}
      template block text
    {{/sg/donation--card-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
