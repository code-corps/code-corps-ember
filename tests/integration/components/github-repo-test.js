import { set } from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import githubRepoComponent from 'code-corps-ember/tests/pages/components/github-repo';

let page = PageObject.create(githubRepoComponent);

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

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  assert.equal(page.name.text, 'code-corps-ember');
});

test('it changes state based on loading, presence of record', function(assert) {
  assert.expect(2);

  set(this, 'githubRepo', {});

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  run(() => set(this, 'githubRepo', { isLoaded: false }));
  assert.ok(page.loading.isVisible, 'With github repo loading, state should be loading.');

  run(() => set(this, 'githubRepo.isLoaded', true));
  assert.ok(page.name.isVisible, 'With github repo loaded, state should be loaded.');
});

test('it changes actions based on sync state and settings', function(assert) {
  assert.expect(7);

  let githubRepo = { name: 'code-corps-ember', isLoaded: true, syncState: 'unsynced' };
  let project = { id: 1, isLoaded: true };
  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  assert.equal(page.actions.connect.text, 'Connect', 'Connect link renders.');

  run(() => {
    set(this, 'githubRepo.syncState', 'fetching_comments');
    set(this, 'githubRepo.project', project);
  });

  assert.notOk(page.actions.close.isVisible, 'Close link does not render while syncing.');
  assert.notOk(page.actions.connect.isVisible, 'Connect link does not render while syncing.');
  assert.notOk(page.actions.edit.isVisible, 'Edit link does not render while syncing.');

  run(() => set(this, 'githubRepo.syncState', 'synced'));

  assert.ok(page.actions.edit.isVisible, 'Edit link renders.');
  page.click();

  assert.ok(page.actions.close.isVisible, 'Collapse link renders.');
  page.click();

  assert.ok(page.actions.edit.isVisible, 'Edit link renders.');
});

test('it allows disconnecting', function(assert) {
  assert.expect(2);

  let project = { id: 1, isLoaded: true };
  let githubRepo = { name: 'code-corps-ember', isLoaded: true, project, syncState: 'synced' };
  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);
  set(this, 'disconnectRepoHandler', function(passedRepo) {
    assert.deepEqual(githubRepo, passedRepo);
  });

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  page.click();
  page.callout.repoDisconnectConfirmModal.openButton.click();
  page.callout.repoDisconnectConfirmModal.modal.input.fillIn(githubRepo.name);
  page.callout.repoDisconnectConfirmModal.modal.disconnectButton.click();

  assert.notOk(page.callout.isVisible, 'Callout has closed');
});

test('it allows connecting', function(assert) {
  assert.expect(2);

  let githubRepo = { name: 'code-corps-ember', isLoaded: true, syncState: 'unsynced' };
  set(this, 'githubRepo', githubRepo);
  set(this, 'connectRepoHandler', function(passedRepo) {
    assert.deepEqual(githubRepo, passedRepo);
  });

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  page.click();
  assert.equal(page.callout.title.text, `Connect to ${githubRepo.name}`, 'Renders the callout title.');
  page.callout.button.click();
});

test('it works with repos connected to other projects properly', function(assert) {
  assert.expect(6);

  let githubRepo = {
    name: 'code-corps-other',
    isLoaded: true,
    syncState: 'unsynced',
    project: { id: 'other', title: 'CodeCorpsOther', isLoaded: true }
  };

  let project = { id: 'this', isLoaded: true };

  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  assert.notOk(page.actions.close.isVisible, 'Close link does not render for repo connected to other project.');
  assert.notOk(page.actions.connect.isVisible, 'Connect link does not render for repo connected to other project.');
  assert.notOk(page.actions.edit.isVisible, 'Edit link does not render for repo connected to other project.');
  assert.ok(page.otherProject.isVisible, 'Other project info renders.');
  assert.equal(page.otherProject.text, 'Connected to CodeCorpsOther', 'Other project info text renders correctly.');

  run(() => set(this, 'githubRepo.syncState', 'fetching_issues'));

  assert.notOk(page.repoSync.isVisible, 'Repo sync does not render for repo connected to other project.');
});

test('clicking disconnected repo expands the UI', function(assert) {
  assert.expect(1);

  let project = { id: 'foo', isLoaded: true };
  let githubRepo = {
    isLoaded: true,
    project: null
  };

  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  run(() => page.click());

  assert.ok(page.callout.isVisible, 'Page did expand');
});

test('clicking fully synced repo connected to current project expands the UI', function(assert) {
  assert.expect(1);

  let project = { id: 'foo', isLoaded: true };
  let githubRepo = {
    isLoaded: true,
    project,
    syncState: 'synced'
  };

  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  run(() => page.click());

  assert.ok(page.callout.isVisible, 'Page did expand');
});

test('clicking repo connected to different project does nothing', function(assert) {
  assert.expect(1);

  let project = { id: 'foo', isLoaded: true };
  let githubRepo = {
    isLoaded: true,
    project: { id: 'bar', isLoaded: true }
  };

  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  run(() => page.click());

  assert.notOk(page.callout.isVisible, 'Page did not expand');
});

test('clicking repo while syncing does nothing', function(assert) {
  assert.expect(1);

  let project = { id: 'foo', isLoaded: true };
  let githubRepo = {
    isLoaded: true,
    project,
    syncState: 'fetching_issues'
  };

  set(this, 'githubRepo', githubRepo);
  set(this, 'project', project);

  this.render(hbs`
    {{github-repo
      connectRepo=connectRepoHandler
      disconnectRepo=disconnectRepoHandler
      githubRepo=githubRepo
      project=project
    }}
  `);

  run(() => page.click());

  assert.notOk(page.callout.isVisible, 'Page did not expand');
});
