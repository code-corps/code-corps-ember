import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['drag-zone'],

  dragState: Ember.inject.service(),

  dragOver() {
    this.get('dragState').dragging();
  },

  dragLeave() {
    this.get('dragState').leaving();
  }
});
