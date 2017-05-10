import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageObject from '../../pages/components/github-issue-select';
import Ember from 'ember';

const { set, run } = Ember;

const page = PageObject.create(pageObject);

moduleForComponent('github-issue-select', 'Integration | Component | github issue select', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    // defaults
    set(this, 'issues', []);
    set(this, 'onIssueSelected', () => {});
    renderPage();
  },
  afterEach() {
    page.removeContext();
  }
});

function renderPage() {
  page.render(hbs`
    {{github-issue-select onIssueSelected=onIssueSelected task=task issues=issues}}
  `);
}

test('it renders options', function(assert) {
  assert.expect(2);

  let issues = [
    { issueName: 'Issue 1', githubId: 1 },
    { issueName: 'Issue 2', githubId: 2 }
  ];

  run(() => set(this, 'issues', issues));

  page.openDropdown();

  assert.equal(page.issues(0).text, 'Issue 1');
  assert.equal(page.issues(1).text, 'Issue 2');
});

test('it triggers action on selection', function(assert) {
  assert.expect(2);

  let issues = [
    { issueName: 'Issue 1', githubId: 1 },
    { issueName: 'Issue 2', githubId: 2 }
  ];

  run(() => set(this, 'issues', issues));

  let [issue1, issue2] = issues;

  let assertIssue1 = (issue) => assert.deepEqual(issue, issue1, 'First issue was sent as part of action.');
  run(() => set(this, 'onIssueSelected', assertIssue1));
  page.openDropdown().issues(0).select();

  let assertIssue2 = (issue) => assert.deepEqual(issue, issue2, 'Second issue was sent as part of action.');
  run(() => set(this, 'onIssueSelected', assertIssue2));
  page.openDropdown().issues(1).select();
});

test('it renders as disabled if task is connected', function(assert) {
  assert.expect(2);

  let issues = [
    { issueName: 'Issue 1', githubId: 1 },
    { issueName: 'Issue 2', githubId: 2 }
  ];

  run(() => set(this, 'issues', issues));

  run(() => set(this, 'task', { githubId: 1 }));
  assert.ok(page.disabled, 'Selection is disabled.');

  run(() => set(this, 'task', { githubId: null }));
  assert.notOk(page.disabled, 'Selection is not disabled.');
});

test('it renders proper selection status if task is connected', function(assert) {
  assert.expect(2);

  let issues = [
    { issueName: 'Issue 1', githubId: 1 },
    { issueName: 'Issue 2', githubId: 2 }
  ];

  run(() => set(this, 'issues', issues));

  run(() => set(this, 'task', { githubId: 1 }));
  assert.equal(page.selectedIssue.text, 'Issue 1', 'Issue name is rendered');

  run(() => set(this, 'task', { githubId: null }));
  assert.equal(page.selectedIssue.text, 'Connect your task with a GitHub issue', 'Placeholder is rendered');
});
