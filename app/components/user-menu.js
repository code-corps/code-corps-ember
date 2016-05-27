import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-menu', 'dropdown'],
  classNameBindings: ['hidden:menu-hidden:menu-visible'],

  hidden: true,

  actions: {
    toggle: function() {
      this.toggleProperty('hidden');
    },
    hide: function() {
      this.set('hidden', true);
    }
  }
});
