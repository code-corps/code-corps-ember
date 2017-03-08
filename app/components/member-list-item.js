import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

export default Component.extend({
  classNames: ['member-list-item'],
  tagName: 'li',
  showApprove: false,
  showDeny: false,

  flashMessages: service(),

  actions: {
    approve(membership) {
      membership.set('role', 'contributor');
      return membership.save().then(() => {
        this._flashSuccess('Membership approved');
      });
    },

    deny(membership) {
      return membership.destroyRecord().then(() => {
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
