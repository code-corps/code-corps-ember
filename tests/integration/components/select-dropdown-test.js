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
  assert.expect(1);

  let items = [
    {
      value: 'task',
      label: 'Task'
    },
    {
      value: 'progress',
      label: 'Progress'
    }
  ];

  this.set('items', items);
  this.render(hbs`{{select-dropdown items=items optionValuePath='value' optionLabelPath='label'}}`);

  assert.equal(this.$('option[value="task"]').text(), 'Task', 'Label and value are properly bound and rendered');
});
