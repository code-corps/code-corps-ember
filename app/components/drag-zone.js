import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['drag-zone'],

  dragState: Ember.inject.service(),

  dragLeave() {
    this.get('dragState').leaving();
  },

  dragOver() {
    this.get('dragState').dragging();
  },
});
