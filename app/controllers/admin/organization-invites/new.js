import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

export default Controller.extend({
  flashMessages: service(),
  store: service(),

  modelName: 'organizationInvite',
  organizationInvite: null,

  actions: {
    sendInvite() {
      let organizationInvite = get(this, 'organizationInvite');

      let onCreated = () => {
        get(this, 'flashMessages').clearMessages().success('Invite sent');
        this.transitionToRoute('admin.organization-invites.index');
      };

      let onFailedSave = (payload) => {
        if (isNonValidationError(payload)) {
          let { message } = payload;
          get(this, 'flashMessages').clearMessages().danger(message);
        }
      };

      organizationInvite.save().then(onCreated).catch(onFailedSave);
    }
  }
});
