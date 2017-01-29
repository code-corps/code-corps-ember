import Ember from 'ember';

const { Service, set } = Ember;

export default Service.extend({
  isDragging: false,

  dragging() {
    set(this, 'isDragging', true);
  },

  leaving() {
    set(this, 'isDragging', false);
  }
});
