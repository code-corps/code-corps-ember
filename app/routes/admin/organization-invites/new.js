import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  model() {
    return this.store.createRecord('organization-invite');
  },

  setupController(controller, organizationInvite) {
    set(controller, 'organizationInvite', organizationInvite);
  },

  actions: {
    willTransition(transition) {
      let organizationInvite = get(this, 'controller.organizationInvite');

      // prompt to confirm if the user did not save
      if (get(organizationInvite, ('isNew'))) {
        let confirmed = window.confirm('You will lose any unsaved information if you leave this page. Are you sure?');
        if (confirmed) {
          organizationInvite.destroyRecord();
        } else {
          transition.abort();
        }
      }
    }
  }
});
