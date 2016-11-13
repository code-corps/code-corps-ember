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
    let flashMessages = get(this, 'flashMessages');
    flashMessages.clearMessages();
    return flashMessages.add({
      message,
      type: 'success',
      fixed: true,
      sticky: false,
      timeout: 5000
    });
  }
});
