import Controller from '@ember/controller';
import {
  computed, get, observer, set, setProperties
} from '@ember/object';
import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

const ALREADY_FULFILLED = 'An organization has already been created with this invite code.';
const NOT_FOUND = 'We couldn\'t find an invite code matching the one you provided.';

export default Controller.extend({
  flashMessages: service(),
  loadingBar: service(),
  store: service(),

  inviteError: null,
  organization: null,
  organizationInvite: null,

  isInvalid: not('isValid'),

  isValid: computed('organizationInvite', function() {
    let invite = get(this, 'organizationInvite');
    if (!invite) {
      set(this, 'inviteError', NOT_FOUND);
      return false;
    }
    let hasOrganization = isPresent(get(invite, 'organization.id'));
    if (hasOrganization) {
      set(this, 'inviteError', ALREADY_FULFILLED);
      return false;
    } else {
      return true;
    }
  }),

  organizationInviteChanged: observer('organizationInvite', function() {
    let organizationInvite = get(this, 'organizationInvite');
    if (organizationInvite) {
      let organization = get(this, 'organization');
      let name = get(organizationInvite, 'organizationName');
      let inviteCode = get(this, 'code');
      setProperties(organization, { name, inviteCode });
    }
  }),

  organizationNameChanged: observer('organization.name', function() {
    let organization = get(this, 'organization');
    if (organization) {
      let name = get(organization, 'name');
      let slug = name ? name.dasherize() : '';
      set(organization, 'slug', slug);
    }
  }),

  uploadDone(cloudinaryPublicId) {
    let organization = get(this, 'organization');
    set(organization, 'cloudinaryPublicId', cloudinaryPublicId);
    this._stopLoadingBar();
  },

  uploadErrored() {
    this._stopLoadingBar();
    get(this, 'flashMessages').clearMessages().danger('Upload failed');
  },

  uploadStarted() {
    this._startLoadingBar();
  },

  actions: {
    save() {
      let organization = get(this, 'organization');

      let onCreated = (organization) => {
        get(this, 'flashMessages').clearMessages().success('Organization created successfully');
        // TODO: Need a projects.new route to transition to
        this.transitionToRoute(
          'slugged-route',
          { slugged_route_slug: get(organization, 'slug') }
        );
      };

      let onFailedSave = (payload) => {
        if (isNonValidationError(payload)) {
          // TODO: Just a temporary handler. We should parse specific messages instead
          let { message } = payload;
          get(this, 'flashMessages').clearMessages().danger(message);
        }
      };

      organization.save().then(onCreated).catch(onFailedSave);
    }
  },

  _startLoadingBar() {
    get(this, 'loadingBar').start();
  },

  _stopLoadingBar() {
    get(this, 'loadingBar').stop();
  }
});
