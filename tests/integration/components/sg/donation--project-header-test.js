import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sg/donation--project-header', 'Integration | Component | sg/donation  project header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sg/donation--project-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sg/donation--project-header}}
      template block text
    {{/sg/donation--project-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
