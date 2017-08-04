import Ember from 'ember';
import ENV from 'code-corps-ember/config/environment';

const {
  Controller,
  computed: { alias, mapBy },
  computed,
  get,
  getProperties,
  inject: { service }
} = Ember;

export default Controller.extend({
  githubAppUrl: ENV.github.appUrl,
  store: service(),

  organization: alias('project.organization'),
  organizationGithubAppInstallations: alias('organization.organizationGithubAppInstallations'),

  userInstallations: alias('user.githubAppInstallations'),
  connectedInstallations: mapBy('organizationGithubAppInstallations', 'githubAppInstallation'),

  unconnectedInstallations: computed('userInstallations', 'connectedInstallations', function() {
    let { userInstallations, connectedInstallations }
      = getProperties(this, 'userInstallations', 'connectedInstallations');

    let connectedInstallationIds
      = connectedInstallations.map((installation) => get(installation, 'id'));

    return userInstallations.filter((installation) => {
      return connectedInstallationIds.indexOf(get(installation, 'id')) === -1;
    });
  }),

  actions: {
    /**
     * Connects an organization to a githubAppInstallation by creating a
     * through record called orgaizationGithubAppInstallation
     *
     * Triggered when user clicks a button to install the GitHub App
     *
     * @method connect
     * @param  {DS.Model} organization The organization to connect an installation with
     * @param  {DS.Model} githubAppInstallation The installation to connect an organization with
     */
    connect(organization, githubAppInstallation) {
      let store = get(this, 'store');
      let record = store.createRecord(
        'organizationGithubAppInstallation',
        { organization, githubAppInstallation }
      );

      return record.save();
    },

    /**
     * Disconnects an organization from a githubAppInstallation by deleting the
     * specified organizationGithubAppInstallation
     *
     * Triggered when user clicks a button to "remove" the GitHub App
     *
     * @method disconnect
     * @param  {DS.Model} organizationGithubAppInstallation The link record that gets deleted
     */
    disconnect(organizationGithubAppInstallation) {
      return organizationGithubAppInstallation.destroyRecord();
    },

    connectRepo(githubRepo, project) {
      let projectGithubRepo = get(this, 'store').createRecord(
        'project-github-repo', { project, githubRepo }
      );
      return projectGithubRepo.save();
    },

    disconnectRepo(projectGithubRepo) {
      return projectGithubRepo.destroyRecord();
    }
  }
});
