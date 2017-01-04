import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskCardComponent from 'code-corps-ember/tests/pages/components/task-card';
import moment from 'moment';
import { Ability } from 'ember-can';

let page = PageObject.create(taskCardComponent);

moduleForComponent('task-card', 'Integration | Component | task card', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    this.register('ability:task', Ability.extend({ canReposition: true }));
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

  let task = { taskType: 'idea' };
  this.set('task', task);
  this.render(hbs`{{task-card task=task}}`);

  assert.ok(page.isIdea, 'Styles the type');
});

test('it renders the issue styles', function(assert) {
  assert.expect(1);

  let task = { taskType: 'issue' };
  this.set('task', task);
  this.render(hbs`{{task-card task=task}}`);

  assert.ok(page.isIssue, 'Styles the type');
});

test('it can reposition if it has the ability', function(assert) {
  assert.expect(1);
  this.register('ability:task', Ability.extend({ canReposition: true }));

  this.render(hbs`{{task-card task=task}}`);

  assert.ok(page.canReposition, 'Can reposition');
});

test('it cannot reposition if it does not have the ability', function(assert) {
  assert.expect(1);
  this.register('ability:task', Ability.extend({ canReposition: false }));

  this.render(hbs`{{task-card task=task}}`);

  assert.notOk(page.canReposition, 'Cannot reposition');
});
