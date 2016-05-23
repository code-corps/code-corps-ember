import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['dropdown-menu'],

  click: function() {
    this.sendAction('hide');
  },

  actions: {
    filterByType: function(type) {
      this.sendAction('filterByType', type);
    },

    hide: function() {
      this.sendAction('hide');
    },
  }
});
