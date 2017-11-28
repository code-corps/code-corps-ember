import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  async approve(organizationInvite) {
    let organization = await get(organizationInvite, 'organization');
    set(organization, 'approved', true);
    let name = get(organization, 'name');
    organization.save().then(() => {
      get(this, 'flashMessages').clearMessages().success(`You approved ${name}.`);
    }).catch(() => {
      organization.rollbackAttributes();
      get(this, 'flashMessages').clearMessages().danger(`An error occurred while approving ${name}.`);
    });
  }
});
