import { set } from '@ember/object';
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
      order: 1
    },
    {
      title: 'test task 1',
      number: 1,
      order: 2
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
  this.render(hbs`{{task-list-cards taskList=taskList}}`);
  assert.equal(page.taskCards.length, 2);
});

test('it renders tasks in the correct order', function(assert) {
  assert.expect(2);
  set(this, 'taskList', taskList);
  this.render(hbs`{{task-list-cards taskList=taskList}}`);
  assert.equal(page.taskCards.objectAt(0).number.text, '#2');
  assert.equal(page.taskCards.objectAt(1).number.text, '#1');
});
