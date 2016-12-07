import Ember from 'ember';

const {
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['drag-zone', 'flexbox-container'],

  dragState: service(),

  dragLeave() {
    get(this, 'dragState').leaving();
  },

  dragOver() {
    get(this, 'dragState').dragging();
  }
});
