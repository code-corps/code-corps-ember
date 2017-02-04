import Ember from 'ember';

const {
  Component,
  computed,
  computed: { not },
  get,
  set
} = Ember;

export default Component.extend({
  alwaysShowX: false,
  hasCheck: false,
  iconBefore: true,
  isHovering: false,
  size: 'large',

  iconAfter: not('iconBefore'),

  spanClass: computed('isLoading', 'isHovering', function() {
    if (get(this, 'isLoading')) {
      return 'button-spinner';
    } else if (get(this, 'alwaysShowX') || get(this, 'isHovering')) {
      return 'x-mark';
    } else if (get(this, 'hasCheck')) {
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
