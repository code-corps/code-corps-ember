import Ember from 'ember';

const {
  computed,
  computed: { alias },
  Component,
  get,
  getProperties
} = Ember;

export default Component.extend({
  classNames: ['github-app-installation connected'],

  organizationGithubAppInstallation: null,
  project: null,

  githubAppInstallation: alias('organizationGithubAppInstallation.githubAppInstallation'),

  organization: alias('project.organization'),
  githubRepos: alias('githubAppInstallation.githubRepos'),

  projectGithubRepos: alias('project.projectGithubRepos'),

  repos: computed('githubRepos.@each', 'githubRepos.isFulfilled', 'projectGithubRepos.@each', 'projectGithubRepos.isFulfilled', function() {
    let { githubRepos, projectGithubRepos }
      = getProperties(this, 'githubRepos', 'projectGithubRepos');

    return githubRepos.map((githubRepo) => {
      let projectGithubRepo = projectGithubRepos.find((projectGithubRepo) => {
        return get(githubRepo, 'id') == projectGithubRepo.belongsTo('githubRepo').id();
      });

      return { githubRepo, projectGithubRepo };
    });
  })
});
