import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['member-list-item'],
  tagName: 'li',

  flashMessages: Ember.inject.service(),

  actions: {
    approve(membership) {
      membership.set('role', 'contributor');
      return membership.save().then(() => {
        this._flashSuccess("Membership approved");
      });
    },

    deny(membership) {
      if (confirm("Are you sure want to deny their membership?")) {
        return membership.destroyRecord().then(() => {
          this._flashSuccess("Membership denied");
        });
      }
    },
  },

  _flashSuccess(message) {
    const flashMessages = Ember.get(this, 'flashMessages');
    flashMessages.clearMessages();
    return flashMessages.add({
      message: message,
      type: 'success',
      fixed: true,
      sticky: false,
      timeout: 5000,
    });
  },
});
