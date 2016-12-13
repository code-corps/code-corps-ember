import Ember from 'ember';
const { get, set } = Ember;
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskListPage from '../../pages/components/task-list';

let page = PageObject.create(taskListPage);

let taskList = {
  name: 'a beautiful test task-list',
  tasks: [
    {
      title: 'test task 1',
      number: 1,
      order: 2,
      taskType: 'task'
    },
    {
      title: 'test task 2',
      number: 2,
      order: 1,
      taskType: 'task'
    }
  ]
};

moduleForComponent('task-list', 'Integration | Component | task list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the task-list title', function(assert) {
  assert.expect(1);
  set(this, 'taskList', taskList);
  page.render(hbs`{{task-list taskList=taskList}}`);
  assert.equal(page.title, get(this, 'taskList.name'));
});

test('it renders all tasks', function(assert) {
  assert.expect(1);
  set(this, 'taskList', taskList);
  page.render(hbs`{{task-list taskList=taskList}}`);
  assert.equal(page.taskCards().count, 2);
});

test('it renders tasks in the correct order', function(assert) {
  assert.expect(2);
  set(this, 'taskList', taskList);
  page.render(hbs`{{task-list taskList=taskList}}`);
  assert.equal(page.taskCards(0).number.text, '#2');
  assert.equal(page.taskCards(1).number.text, '#1');
});
