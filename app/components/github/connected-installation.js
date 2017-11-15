import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['github-app-installation connected'],

  organizationGithubAppInstallation: null,
  project: null,

  githubAppInstallation: alias('organizationGithubAppInstallation.githubAppInstallation'),

  iconUrl: computed('githubAppInstallation.githubAccountAvatarUrl', function() {
    let avatarUrl = get(this, 'githubAppInstallation.githubAccountAvatarUrl');
    return `${avatarUrl}&size=80`;
  }),

  organization: alias('project.organization'),
  githubRepos: alias('githubAppInstallation.githubRepos')
});
