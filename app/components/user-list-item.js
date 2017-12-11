import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['user-list-item'],
  tagName: 'li',
  showApprove: false,
  showDeny: false,

  flashMessages: service(),

  projectUser: null,
  user: null,

  project: alias('projectUser.project'),

  actions: {
    approve(projectUser) {
      set(projectUser, 'role', 'contributor');
      return projectUser.save().then(() => {
        this._flashSuccess('Membership approved');
      });
    },

    deny(projectUser) {
      return projectUser.destroyRecord().then(() => {
        this._flashSuccess('Membership denied');
      });
    },

    showApprove() {
      set(this, 'showApprove', true);
    },

    showDeny() {
      set(this, 'showDeny', true);
    }
  },

  _flashSuccess(message) {
    let options = { fixed: true, sticky: false, timeout: 5000 };
    get(this, 'flashMessages').clearMessages().success(message, options);
  }
});
