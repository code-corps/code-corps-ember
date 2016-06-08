import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-menu', 'dropdown'],
  classNameBindings: ['hidden:menu-hidden:menu-visible'],

  didInitAttrs() {
    this.hidden = true;
  },

  actions: {
    hide: function() {
      this.set('hidden', true);
    },
    toggle: function() {
      this.toggleProperty('hidden');
    },
  }
});
