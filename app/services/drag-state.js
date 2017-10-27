import Service from '@ember/service';

export default Service.extend({
  isDragging: false,

  dragging() {
    this.set('isDragging', true);
  },

  leaving() {
    this.set('isDragging', false);
  }
});
