import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('common/busy-model-wrapper', 'Integration | Component | common/busy model wrapper', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{common/busy-model-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#common/busy-model-wrapper}}
      template block text
    {{/common/busy-model-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
