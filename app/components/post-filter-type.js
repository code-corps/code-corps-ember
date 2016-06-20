import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group', 'dropdown'],
  classNameBindings: ['active:menu-visible:menu-hidden'],

  active: false,

  actions: {
    filterByType(type) {
      this.sendAction('filterByType', type);
    },

    hide() {
      this.set('active', false);
    },

    toggle() {
      this.toggleProperty('active');
    },
  },
});
