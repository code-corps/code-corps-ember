import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  dragulaconfig: {
    options: {
      copy: false,
      revertOnSpill: false,
      removeOnSpill: false
      // Other options from the dragula source page.
    },
    enabledEvents: ['drag', 'drop']
  },

  actions: {
    // onDrop(el, target) {
      // let listId = target.dataset.modelId;
      // let position = $(el).index();
      // let taskId = el.dataset.modelId;
    // }
  }
});
