import ENV from 'code-corps-ember/config/environment';
import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  githubAppUrl: ENV.github.appUrl,

  metrics: service(),

  organization: null,
  project: null,

  actions: {
    trackClick() {
      let organizationId = get(this, 'organization.id');
      let organizationName = get(this, 'organization.name');
      let projectId = get(this, 'project.id');
      let projectTitle = get(this, 'project.title');
      get(this, 'metrics').trackEvent({
        event: 'Clicked Install GitHub Application',
        organization: organizationName,
        organization_id: organizationId,
        project: projectTitle,
        project_id: projectId
      });
    }
  }
});
