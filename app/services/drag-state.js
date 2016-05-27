import Ember from 'ember';

export default Ember.Service.extend({
  isDragging: false,

  dragging() {
    this.set('isDragging', true);
  },

  leaving() {
    this.set('isDragging', false);
  }
});
