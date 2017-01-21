import Ember from 'ember';
const { set } = Ember;
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskListCardsPage from '../../pages/components/task-list-cards';
import { Ability } from 'ember-can';

let page = PageObject.create(taskListCardsPage);

let taskList = {
  name: 'a beautiful test task-list-cards',
  orderedTasks: [
    {
      title: 'test task 2',
      number: 2,
      order: 1,
      taskType: 'task'
    },
    {
      title: 'test task 1',
      number: 1,
      order: 2,
      taskType: 'task'
    }
  ]
};

moduleForComponent('task-list-cards', 'Integration | Component | task list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    this.register('ability:task', Ability.extend({ canReposition: true }));
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all tasks', function(assert) {
  assert.expect(1);
  set(this, 'taskList', taskList);
  page.render(hbs`{{task-list-cards taskList=taskList}}`);
  assert.equal(page.taskCards().count, 2);
});

test('it renders tasks in the correct order', function(assert) {
  assert.expect(2);
  set(this, 'taskList', taskList);
  page.render(hbs`{{task-list-cards taskList=taskList}}`);
  assert.equal(page.taskCards(0).number.text, '#2');
  assert.equal(page.taskCards(1).number.text, '#1');
});
