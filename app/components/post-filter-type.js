import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group', 'dropdown'],
  classNameBindings: ['active:menu-visible:menu-hidden'],

  active: false,

  actions: {
    filterByType: function(type) {
      this.sendAction('filterByType', type);
    },
    hide: function() {
      this.set('active', false);
    },
    toggle: function() {
      this.toggleProperty('active');
    },
  },
});
