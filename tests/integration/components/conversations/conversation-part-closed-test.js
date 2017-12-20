import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('conversations/conversation-part-closed', 'Integration | Component | conversations/conversation part closed', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{conversations/conversation-part-closed}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#conversations/conversation-part-closed}}
      template block text
    {{/conversations/conversation-part-closed}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
