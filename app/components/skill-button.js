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
  attributeBindings: ['isLoading:disabled'],
  classNames: ['has-spinner', 'skill'],
  classNameBindings: ['isHovering:can-delete', 'size', 'type'],
  hasCheck: false,
  iconAfter: not('iconBefore'),
  iconBefore: true,
  isHovering: false,
  size: 'large',
  tagName: 'button',

  click() {
    get(this, 'remove')();
  },

  mouseEnter() {
    set(this, 'isHovering', true);
  },

  mouseLeave() {
    set(this, 'isHovering', false);
  },

  /**
    @property spanClass
    @type String
   */
  spanClass: computed('isLoading', 'isHovering', function() {
    if (get(this, 'isLoading')) {
      return 'button-spinner';
    } else if (get(this, 'alwaysShowX') || get(this, 'isHovering')) {
      return 'x-mark';
    } else if (get(this, 'hasCheck')) {
      return 'check-mark';
    }
  })
});
