import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-status';

let page = PageObject.create(component);

moduleForComponent('task-status', 'Integration | Component | task status', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders closed status', function(assert) {
  assert.expect(3);

  let task = { overallStatus: 'closed' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isClosed, 'Has the closed class');
  assert.ok(page.iconClosed.isVisible);
  assert.equal(page.statusText, 'Closed', 'Closed text renders');
});

test('it renders open status', function(assert) {
  assert.expect(3);

  let task = { overallStatus: 'open' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isOpen, 'Has the open class');
  assert.ok(page.iconOpen.isVisible);
  assert.equal(page.statusText, 'Open', 'Open text renders');
});

test('it renders pull request open status', function(assert) {
  assert.expect(3);

  let task = { hasGithubPullRequest: true, overallStatus: 'open' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isOpen, 'Has the open class');
  assert.ok(page.iconPullRequest.isVisible, 'Pull request icon renders');
  assert.equal(page.statusText, 'Open', 'Open text renders');
});

test('it renders pull request closed status', function(assert) {
  assert.expect(3);

  let task = { hasGithubPullRequest: true, overallStatus: 'closed' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isClosed, 'Has the closed class');
  assert.ok(page.iconPullRequest.isVisible, 'Pull request icon renders');
  assert.equal(page.statusText, 'Closed', 'Closed text renders');
});

test('it renders pull request merged status', function(assert) {
  assert.expect(3);

  let task = { hasGithubPullRequest: true, overallStatus: 'merged' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isMerged, 'Has the merged class');
  assert.ok(page.iconPullRequestMerged.isVisible, 'Pull request merged icon renders');
  assert.equal(page.statusText, 'Merged', 'Merged text renders');
});
