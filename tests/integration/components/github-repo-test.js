import { set } from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import githubRepoComponent from 'code-corps-ember/tests/pages/components/github-repo';

let page = PageObject.create(githubRepoComponent);

function renderPage() {
  page.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
      projectGithubRepo=projectGithubRepo
    }}
  `);
}

moduleForComponent('github-repo', 'Integration | Component | github repo', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the github repo name', function(assert) {
  assert.expect(1);
  let githubRepo = { name: 'code-corps-ember', isLoaded: true };
  set(this, 'githubRepo', githubRepo);
  set(this, 'projectGithubRepo', null);
  renderPage();
  assert.equal(page.name.text, 'code-corps-ember');
});

test('it changes state based on loading, presence of records', function(assert) {
  assert.expect(4);

  set(this, 'githubRepo', {});

  renderPage();

  run(() => set(this, 'githubRepo', { isLoaded: false }));
  assert.ok(page.loading.isVisible, 'With github repo loading and no project github repo, state should be loading.');

  run(() => set(this, 'githubRepo.isLoaded', true));
  assert.ok(page.name.isVisible, 'With github repo loaded and no project github repo, state should be loaded.');

  run(() => set(this, 'projectGithubRepo', { isLoaded: false }));
  assert.ok(page.loading.isVisible, 'With project github repo loading, state should be loading.');

  run(() => set(this, 'projectGithubRepo.isLoaded', true));
  assert.ok(page.name.isVisible, 'With project github repo loaded, state should be loaded.');
});

test('it changes actions based on sync state and settings', function(assert) {
  assert.expect(7);

  let githubRepo = { name: 'code-corps-ember', isLoaded: true, syncState: 'unsynced' };
  set(this, 'githubRepo', githubRepo);
  renderPage();

  assert.ok(page.actions.connect.text, 'Connect', 'Connect link renders.');

  run(() => set(this, 'githubRepo.syncState', 'fetching_comments'));
  assert.notOk(page.actions.close.isVisible, 'Close link does not render while syncing.');
  assert.notOk(page.actions.connect.isVisible, 'Connect link does not render while syncing.');
  assert.notOk(page.actions.edit.isVisible, 'Edit link does not render while syncing.');

  run(() => set(this, 'githubRepo.syncState', 'receiving_webhooks'));
  let projectGithubRepo = { isLoaded: true, syncState: 'synced' };
  run(() => set(this, 'projectGithubRepo', projectGithubRepo));

  assert.ok(page.actions.edit.text, 'Edit', 'Edit link renders.');

  page.click();

  assert.ok(page.actions.close.text, 'Collapse', 'Collapse link renders.');

  page.click();

  assert.ok(page.actions.edit.text, 'Edit', 'Edit link renders.');
});

test('it allows disconnecting', function(assert) {
  assert.expect(1);

  let githubRepo = { name: 'code-corps-ember', isLoaded: true, syncState: 'receiving_webhooks' };
  let projectGithubRepo = { isLoaded: true, syncState: 'synced' };
  set(this, 'githubRepo', githubRepo);
  set(this, 'projectGithubRepo', projectGithubRepo);
  set(this, 'disconnectRepoHandler', function(passedProjectRepo) {
    assert.deepEqual(projectGithubRepo, passedProjectRepo);
  });
  renderPage();

  page.click();
  page.callout.repoDisconnectConfirmModal.openButton.click();
  page.callout.repoDisconnectConfirmModal.modal.input.fillIn(githubRepo.name);
  page.callout.repoDisconnectConfirmModal.modal.disconnectButton.click();
});

test('it allows connecting', function(assert) {
  assert.expect(2);

  let githubRepo = { name: 'code-corps-ember', isLoaded: true, syncState: 'unsynced' };
  set(this, 'githubRepo', githubRepo);
  set(this, 'projectGithubRepo', null);
  set(this, 'connectRepoHandler', function(passedRepo) {
    assert.deepEqual(githubRepo, passedRepo);
  });
  renderPage();

  page.click();
  assert.equal(page.callout.title.text, `Connect to ${githubRepo.name}`, 'Renders the callout title.');
  page.callout.button.click();
});
