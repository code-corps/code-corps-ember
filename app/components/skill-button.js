import Ember from 'ember';

const {
  Component,
  computed,
  get,
  inject: { service },
  set
} = Ember;

export default Component.extend({
  isHovering: false,

  userSkills: service(),

  spanClass: computed('isLoading', 'isHovering', function() {
    if (get(this, 'isLoading')) {
      return 'button-spinner';
    } else if (get(this, 'isHovering')) {
      return 'x-mark';
    } else {
      return 'check-mark';
    }
  }),

  actions: {
    hoverButton() {
      set(this, 'isHovering', true);
    },

    leaveButton() {
      set(this, 'isHovering', false);
    }
  }
});
