import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, or },
  inject: { service },
  get,
  set
} = Ember;

export default Component.extend({
  store: service(),

  classNames: ['task__user__user-select'],
  classNameBindings: ['canEdit:task__user__user-select--can-edit', 'isLoading:task__user__user-select--is-loading'],
  tagName: 'p',

  constraints: [{
    to: 'scrollParent',
    attachment: 'together',
    pin: true
  }],
  showUsers: false,
  isHovering: false,
  limit: 10,

  isLoading: or('userIsLoading', 'userTaskIsLoading'),
  userIsLoading: alias('user.isLoading'),
  userTaskIsLoading: alias('userTask.isLoading'),

  target: computed('elementId', function() {
    return `#${get(this, 'elementId')}`;
  }),

  click(/* event */) {
    let canEdit = get(this, 'canEdit');
    if (!canEdit) {
      return true; // bubble event to be a click on the task card
    }

    let initiallyHidden = get(this, 'showUsers');
    set(this, 'showUsers', true);
    if (!initiallyHidden) {
      return false;
    }
  },

  actions: {
    hide(/* event */) {
      set(this, 'showUsers', false);
    }
  }
});
