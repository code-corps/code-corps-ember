import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropdown-menu'],
  tagName: 'ul',

  click() {
    this.sendAction('hide');
  },

  actions: {
    filterBy(filter) {
      this.sendAction('filterBy', filter);
    },

    hide() {
      this.sendAction('hide');
    },
  }
});
