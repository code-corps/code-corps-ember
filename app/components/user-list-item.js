import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import RSVP from 'rsvp';

export default Component.extend({
  classNames: ['user-list-item'],
  tagName: 'li',

  flashMessages: service(),

  projectUser: null,
  showRoleModal: false,
  user: null,

  project: alias('projectUser.project'),

  actions: {
    approve(projectUser) {
      let confirmed = window.confirm('Are you sure you want to approve their membership?');
      if (confirmed) {
        set(projectUser, 'role', 'contributor');
        return projectUser.save().then(() => {
          this._flashSuccess('Membership approved');
        });
      } else {
        return RSVP.reject();
      }
    },

    changeRole(projectUser, role) {
      let currentRole = get(projectUser, 'role');
      if (role === currentRole) {
        set(this, 'showRoleModal', false);
        return RSVP.resolve();
      }

      set(projectUser, 'role', role);
      return projectUser.save().then(() => {
        this._flashSuccess(`Role changed to ${role}`);
      });
    },

    deny(projectUser) {
      let confirmed = window.confirm('Are you sure you want to deny their membership?');
      if (confirmed) {
        return projectUser.destroyRecord().then(() => {
          this._flashSuccess('Membership denied');
        });
      } else {
        return RSVP.reject();
      }
    }
  },

  _flashSuccess(message) {
    let options = { fixed: true, sticky: false, timeout: 5000 };
    get(this, 'flashMessages').clearMessages().success(message, options);
  }
});
