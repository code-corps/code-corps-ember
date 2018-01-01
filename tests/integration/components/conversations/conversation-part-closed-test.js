import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-part-closed';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-part-closed
      author=author
      closedAt=closedAt
    }}
  `);

moduleForComponent('conversations/conversation-part-closed', 'Integration | Component | conversations/conversation part closed', {
  integration: true
});

test('if user closes message, "You closed this at" is rendered', function(assert){

})

test('if user looks at closed message they did not close, "author.username" is rendered', function(assert){

})

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
