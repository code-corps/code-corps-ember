import Ember from 'ember';

const {
  computed: { sort },
  Controller,
  get,
  inject: { service },
  set
} = Ember;

export default Controller.extend({
  sorting: ['order:asc'],

  store: service(),

  orderedTaskLists: sort('project.taskLists', 'sorting'),

  dragulaconfig: {
    options: {
      moves(el) {
        return el.dataset.canReposition == 'true';
      },
      copy: false,
      revertOnSpill: false,
      removeOnSpill: false
      // Other options from the dragula source page.
    },
    enabledEvents: ['drag', 'drop']
  },

  actions: {
    onDrop(el, target) {
      let listId = target.dataset.modelId;
      let position = $(el).index();
      let taskId = el.dataset.modelId;
      let store = get(this, 'store');
      store.findRecord('task', taskId).then((task) => {
        set(task, 'task-list', listId);
        set(task, 'position', position);
        task.save();
      });
    }
  }
});
