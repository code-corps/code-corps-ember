import { run } from '@ember/runloop';
import { set, get } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import selectGithubRepoComponent from '../../../pages/components/select/github-repo';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(selectGithubRepoComponent);

moduleForComponent('select/github-repo', 'Integration | Component | select/github repo', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders options', function(assert) {
  assert.expect(3);

  let githubRepos = [
    { name: 'Repo 1', id: 1 },
    { name: 'Repo 2', id: 2 }
  ];

  set(this, 'githubRepos', githubRepos);

  this.render(hbs`
    {{select/github-repo
      githubRepos=githubRepos
      selectedRepo=selectedRepo
      onSelected=(action (mut selectedRepo))
    }}
  `);

  assert.equal(page.select.options.objectAt(0).text, 'Don\'t sync (default)', 'The default option of none renders.');
  assert.equal(page.select.options.objectAt(1).text, 'Repo 1');
  assert.equal(page.select.options.objectAt(2).text, 'Repo 2');
});

test('it triggers action on selection', function(assert) {
  assert.expect(2);

  let [repo1, repo2] = [
    { name: 'Repo 1', id: 1 },
    { name: 'Repo 2', id: 2 }
  ];

  set(this, 'githubRepos', [repo1, repo2]);

  this.render(hbs`
    {{select/github-repo
      githubRepos=githubRepos
      selectedRepo=selectedRepo
      onSelected=(action (mut selectedRepo))
    }}
  `);

  run(() => page.select.fillIn('Repo 1'));
  run(() => {
    assert.deepEqual(get(this, 'selectedRepo'), repo1);
  });

  run(() => page.select.fillIn('Repo 2'));
  run(() => {
    assert.deepEqual(get(this, 'selectedRepo'), repo2);
  });
});
