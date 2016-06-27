import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('landing-subsection', 'Integration | Component | landing subsection', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{landing-subsection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#landing-subsection}}
      template block text
    {{/landing-subsection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
