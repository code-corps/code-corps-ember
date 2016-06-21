import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-menu', 'dropdown'],
  classNameBindings: ['hidden:menu-hidden:menu-visible'],

  init() {
    this._super(...arguments);
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
