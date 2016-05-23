import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group', 'dropdown'],
  classNameBindings: ['active:menu-visible:menu-hidden'],

  active: false,

  actions: {
    toggle: function() {
      this.toggleProperty('active');
    },
    hide: function() {
      this.set('active', false);
    },
    filterByType: function(type) {
      this.sendAction('filterByType', type);
    },
  }
});
