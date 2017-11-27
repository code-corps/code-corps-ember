import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { resolve } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  flashMessages: service(),

  queryParams: { code: 'code' },

  async beforeModel(transition) {
    if (get(this, 'session.isAuthenticated')) {
      let invite = await this._loadInvite(transition);
      // Pass data along into the `model` hook
      return set(transition, 'data', { organizationInvite: invite });
    } else {
      // call `beforeModel` in `AuthenticatedRouteMixin`
      return this._super(transition);
    }
  },

  async model({ code }, transition) {
    let organizationInvite = get(transition, 'data.organizationInvite');
    if (isPresent(organizationInvite)) {
      let organization = await this._initOrganization(organizationInvite, code);
      return { organization, organizationInvite };
    } else {
      return { organization: null, organizationInvite: null };
    }
  },

  setupController(controller, { organization, organizationInvite }) {
    controller.set('organization', organization);
    controller.set('organizationInvite', organizationInvite);
  },

  async _loadInvite(transition) {
    let { queryParams: { code } } = transition;
    if (code) {
      let invites = await get(this, 'store').query('organization-invite', { code });
      return get(invites, 'firstObject');
    } else {
      return resolve(null);
    }
  },

  async _initOrganization(organizationInvite, inviteCode) {
    let name = get(organizationInvite, 'name');
    let owner = await get(this, 'currentUser.user');
    return get(this, 'store').createRecord('organization', { name, owner, inviteCode });
  },

  actions: {
    willTransition(transition) {
      let organization = get(this, 'controller.organization');
      let inviteError = get(this, 'controller.inviteError');
      // prompt to confirm if the user did not save
      if (!isPresent(inviteError) && get(organization, ('isNew'))) {
        let confirmed = window.confirm('You will lose any unsaved information if you leave this page. Are you sure?');
        if (confirmed) {
          organization.destroyRecord();
        } else {
          transition.abort();
        }
      }
    },

    verifyInvite() {
      this.refresh();
    }
  }
});
