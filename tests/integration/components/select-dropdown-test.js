import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-dropdown', 'Integration | Component | select-dropdown', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{select-dropdown}}`);

  assert.equal(this.$('select').length, 1, 'The component\'s element renders');
});

test('it renders proper ui elements, properly bound', function(assert) {
  assert.expect(2);

  let items = [
    {
      value: 'task',
      label: 'Task'
    },
    {
      value: 'idea',
      label: 'Idea'
    }
  ];

  this.set('items', items);
  this.set('selectedItem', 'task');
  this.render(hbs`{{select-dropdown items=items optionValuePath='value' optionLabelPath='label' selectedItem=selectedItem}}`);

  assert.equal(this.$('option[value="task"]').text(), 'Task', 'Label and value are properly bound and rendered');
  assert.ok(this.$('.select-dropdown').hasClass('task'), 'Class is bound to selectedItem value');
});
