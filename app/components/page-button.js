import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['page-button'],
  classNameBindings: ['current', 'page'],

  click() {
    this.sendAction('action', this.get('page'));
  },

  current: Ember.computed('page', 'currentPage', function() {
    let page = this.get('page');
    let currentPage = this.get('currentPage');

    return page === currentPage;
  })
});
