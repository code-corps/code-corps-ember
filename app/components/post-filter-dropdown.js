import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropdown-menu'],
  tagName: 'ul',

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
