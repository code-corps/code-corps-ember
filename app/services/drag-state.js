import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
  isDragging: false,

  dragging() {
    this.set('isDragging', true);
  },

  leaving() {
    this.set('isDragging', false);
  }
});
