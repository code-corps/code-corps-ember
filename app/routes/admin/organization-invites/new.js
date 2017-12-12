import Route from '@ember/routing/route';
import { set } from '@ember/object';
import Confirm from 'code-corps-ember/mixins/confirm';

export default Route.extend(Confirm, {
  model() {
    return this.store.createRecord('organization-invite');
  },

  setupController(controller, organizationInvite) {
    set(controller, 'organizationInvite', organizationInvite);
  }
});
