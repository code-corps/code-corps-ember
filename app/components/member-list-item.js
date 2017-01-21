import Ember from 'ember';

const {
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['member-list-item'],
  tagName: 'li',

  flashMessages: service(),

  actions: {
    approve(membership) {
      membership.set('role', 'contributor');
      return membership.save().then(() => {
        this._flashSuccess('Membership approved');
      });
    },

    deny(membership) {
      if (confirm('Are you sure want to deny their membership?')) {
        return membership.destroyRecord().then(() => {
          this._flashSuccess('Membership denied');
        });
      }
    }
  },

  _flashSuccess(message) {
    let options = { fixed: true, sticky: false, timeout: 5000 };
    get(this, 'flashMessages').clearMessages().success(message, options);
  }
});
