import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskCardComponent from 'code-corps-ember/tests/pages/components/task-card';
import moment from 'moment';

let page = PageObject.create(taskCardComponent);

moduleForComponent('task-card', 'Integration | Component | task card', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all the required elements', function(assert) {
  assert.expect(4);

  let task = {
    insertedAt: moment().subtract(2, 'days'),
    number: 1,
    taskType: 'task',
    title: 'Clean the house'
  };

  this.set('task', task);
  this.render(hbs`{{task-card task=task}}`);

  assert.ok(page.isTask, 'Styles the type');
  assert.equal(page.number.text, '#1', 'The number renders');
  assert.equal(page.time.text, '2 days ago', 'The time renders');
  assert.equal(page.title.text, 'Clean the house', 'The title renders');
});

test('it renders the idea styles', function(assert) {
  assert.expect(1);

  let task = { taskType: 'idea'};
  this.set('task', task);
  this.render(hbs`{{task-card task=task}}`);

  assert.ok(page.isIdea, 'Styles the type');
});

test('it renders the issue styles', function(assert) {
  assert.expect(1);

  let task = { taskType: 'issue'};
  this.set('task', task);
  this.render(hbs`{{task-card task=task}}`);

  assert.ok(page.isIssue, 'Styles the type');
});
