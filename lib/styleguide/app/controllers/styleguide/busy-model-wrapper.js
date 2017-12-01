import Ember from 'ember';

const { set } = Ember;
const connectedRepo = { id: 1, name: 'Connected Repo', isLoaded: true };
const projectGithubRepo = {
  githubRepo: connectedRepo,
  id: 'project-github-repo',
  isLoaded: true,
  belongsTo() {
    return { id: () => 1 };
  }
};
const organization = { name: 'Organization' };

const project = {
  id: 'project',
  organization,
  projectGithubRepos: [projectGithubRepo]
};

export default Ember.Controller.extend({
  organizationGithubAppInstallation: project
});
