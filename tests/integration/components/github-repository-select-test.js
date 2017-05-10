import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageObject from '../../pages/components/github-repository-select';
import Ember from 'ember';

const { set, run } = Ember;

const page = PageObject.create(pageObject);

moduleForComponent('github-repository-select', 'Integration | Component | github repository select', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    // defaults
    set(this, 'repositories', []);
    set(this, 'onRepoSelected', () => {});
    renderPage();
  },
  afterEach() {
    page.removeContext();
  }
});

function renderPage() {
  page.render(hbs`
    {{github-repository-select
      onRepoSelected=onRepoSelected
      project=project
      repositories=repositories}}
  `);
}

test('it renders options', function(assert) {
  assert.expect(2);

  let repositories = [
    { repositoryName: 'Repo 1', githubId: 1 },
    { repositoryName: 'Repo 2', githubId: 2 }
  ];

  run(() => set(this, 'repositories', repositories));

  page.openDropdown();

  assert.equal(page.repositories(0).text, 'Repo 1');
  assert.equal(page.repositories(1).text, 'Repo 2');
});

test('it triggers action on selection', function(assert) {
  assert.expect(2);

  let repositories = [
    { repositoryName: 'Repo 1', githubId: 1 },
    { repositoryName: 'Repo 2', githubId: 2 }
  ];

  run(() => set(this, 'repositories', repositories));

  let [repo1, repo2] = repositories;

  let assertRepo1 = (repo) => assert.deepEqual(repo, repo1, 'First repo was sent as part of action.');
  run(() => set(this, 'onRepoSelected', assertRepo1));
  page.openDropdown().repositories(0).select();

  let assertRepo2 = (repo) => assert.deepEqual(repo, repo2, 'Second repo was sent as part of action.');
  run(() => set(this, 'onRepoSelected', assertRepo2));
  page.openDropdown().repositories(1).select();
});

test('it renders as disabled if project is connected', function(assert) {
  assert.expect(2);

  let repositories = [
    { repositoryName: 'Repo 1', githubId: 1 },
    { repositoryName: 'Repo 2', githubId: 2 }
  ];

  run(() => set(this, 'repositories', repositories));

  run(() => set(this, 'project', { githubId: 1 }));
  assert.ok(page.disabled, 'Selection is disabled.');

  run(() => set(this, 'project', { githubId: null }));
  assert.notOk(page.disabled, 'Selection is not disabled.');
});

test('it renders proper selection status if project is connected', function(assert) {
  assert.expect(2);

  let repositories = [
    { repositoryName: 'Repo 1', githubId: 1 },
    { repositoryName: 'Repo 2', githubId: 2 }
  ];

  run(() => set(this, 'repositories', repositories));

  run(() => set(this, 'project', { githubId: 1 }));
  assert.equal(page.selectedRepository.text, 'Repo 1', 'Repo name is rendered');

  run(() => set(this, 'project', { githubId: null }));
  assert.equal(page.selectedRepository.text, 'Connect your project with a GitHub repository', 'Placeholder is rendered');
});
