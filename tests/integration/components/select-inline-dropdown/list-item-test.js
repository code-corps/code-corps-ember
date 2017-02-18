import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-inline-dropdown/list-item', 'Integration | Component | select inline dropdown/list item', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{select-inline-dropdown/list-item}}`);

  assert.equal(this.$().text().trim(), '');
});
