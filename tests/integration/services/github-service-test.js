import { moduleFor, test } from 'ember-qunit';
import { startMirage } from 'code-corps-ember/initializers/ember-cli-mirage';

const githubRepo = {
  id: 1296269,
  owner: {
    login: 'octocat',
    id: 1,
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    type: 'User',
    site_admin: false
  },
  name: 'Hello-World',
  full_name: 'octocat/Hello-World',
  description: 'This your first repo!',
  private: false,
  fork: false,
  language: null,
  forks_count: 9,
  stargazers_count: 80,
  watchers_count: 80,
  size: 108,
  permissions: {
    admin: false,
    push: false,
    pull: true
  }
};

const githubRepoData = [githubRepo];

const githubIssue = {
  id: 1,
  url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
  repository_url: 'https://api.github.com/repos/octocat/Hello-World',
  number: 1347,
  state: 'open',
  title: 'Found a bug',
  body: "I'm having a problem with this."
};

const githubIssueData = [githubIssue];

const project = Object.create({ githubId: githubRepo.id });

moduleFor('service:github-service', 'Integration | Service | github service', {
  integration: true,
  beforeEach() {
    this.server = new startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('getRepositories returns a properly mapped list of github repositories', function(assert) {
  assert.expect(1);

  let service = this.subject();

  this.server.get('https://api.github.com/user/repos', function() {
    return githubRepoData;
  });

  let done = assert.async();
  service.getRepositories().then(([repo]) => {
    let expectedRepo = { repositoryName: githubRepo.name, githubId: githubRepo.id };
    assert.deepEqual(repo, expectedRepo, 'Repository was properly mapped.');
    done();
  });
});

test('getRepositories throws error if something goes wrong', function(assert) {
  assert.expect(1);

  let service = this.subject();

  this.server.get('https://api.github.com/user/repos', {}, 401);

  let done = assert.async();
  service.getRepositories().catch(() => {
    assert.ok(true, 'Error was raised.');
    done();
  });
});

test('getIssues returns a properly mapped list of github issues for a repository', function(assert) {
  assert.expect(1);

  let service = this.subject();

  this.server.get('https://api.github.com/repositories/1296269', githubRepo, 200);

  this.server.get('https://api.github.com/octocat/Hello-World/issues', function() {
    return githubIssueData;
  });

  let done = assert.async();
  service.getIssues(project).then(([issue]) => {
    let expectedIssue = { issueName: githubIssue.title, githubId: githubIssue.id };
    assert.deepEqual(issue, expectedIssue, 'Issue was properly mapped.');
    done();
  });
});

test('getRepositories throws error if something goes wrong', function(assert) {
  assert.expect(1);

  let service = this.subject();

  this.server.get('https://api.github.com/repositories/1296269', githubRepo, 200);

  this.server.get('https://api.github.com/octocat/Hello-World/issues', {}, 401);

  let done = assert.async();
  service.getIssues(project).catch(() => {
    assert.ok(true, 'Error was raised.');
    done();
  });
});
