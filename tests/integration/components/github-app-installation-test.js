import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('github-app-installation', 'Integration | Component | github app installation', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{github-app-installation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#github-app-installation}}
      template block text
    {{/github-app-installation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
