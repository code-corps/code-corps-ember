import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'code-corps-ember/tests/pages/components/task/sidebar/integrations-section';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

moduleForComponent('task/sidebar/integrations-section', 'Integration | Component | task/sidebar/integrations section', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('when connected to a GitHub Issue', function(assert) {
  assert.expect(2);

  let task = { githubIssue: { number: '123' } };
  set(this, 'task', task);

  this.render(hbs`{{task/sidebar/integrations-section task=task}}`);

  assert.notOk(page.emptyMessage.isVisible, 'The empty message is not visible');
  assert.ok(page.issueLink.isVisible, 'The issue link is visible');
});

test('when not connected to a GitHub Issue', function(assert) {
  assert.expect(2);

  let task = { githubIssue: null };
  set(this, 'task', task);

  this.render(hbs`{{task/sidebar/integrations-section task=task}}`);

  assert.ok(page.emptyMessage.isVisible, 'The empty message is visible');
  assert.notOk(page.issueLink.isVisible, 'The issue link is not visible');
});
