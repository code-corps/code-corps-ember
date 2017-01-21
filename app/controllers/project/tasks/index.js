import Ember from 'ember';

const {
  computed: { sort },
  Controller,
  get,
  inject: { service },
  RSVP,
  setProperties
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
    onDrop(droppedTaskEl, listDropTargetEl, source, siblingTaskEl) {
      // Get the necessary attributes from the dropped card and drop target
      let listId = listDropTargetEl.dataset.modelId;
      let position = $(droppedTaskEl).index();
      let taskId = droppedTaskEl.dataset.modelId;

      let store = get(this, 'store');
      let taskList = store.findRecord('taskList', listId);
      let task = store.findRecord('task', taskId);

      if (siblingTaskEl) {
        let siblingTaskId = siblingTaskEl.dataset.modelId;
        this._moveTaskAboveTask(taskList, task, siblingTaskId, position, droppedTaskEl);
      } else {
        this._moveTaskMaybeBelowTask(taskList, task, position, droppedTaskEl);
      }
    }
  },

  _isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  },

  _moveTaskAboveTask(taskList, task, siblingTaskId, position, droppedTaskEl) {
    let store = get(this, 'store');
    let siblingTask = store.findRecord('task', siblingTaskId);

    RSVP.hash({
      siblingTask,
      task,
      taskList
    }).then(({ siblingTask, task, taskList }) => {
      let originalListId = get(task, 'taskList.id');
      let newListId = get(taskList, 'id');
      if (originalListId !== newListId) {
        droppedTaskEl.remove();
      }
      let siblingOrder = get(siblingTask, 'order');
      let order = this._newOrder(siblingOrder, -1);
      this._saveTask(task, order, position, taskList);
    });
  },

  _moveTaskMaybeBelowTask(taskList, task, position, droppedTaskEl) {
    RSVP.hash({
      task,
      taskList
    }).then(({ task, taskList }) => {
      let originalListId = get(task, 'taskList.id');
      let newListId = get(taskList, 'id');
      let tempOrder = 0;
      let lastTask = get(taskList, 'orderedTasks.lastObject');
      if (lastTask) {
        tempOrder = get(lastTask, 'order');
      }
      let order = this._newOrder(tempOrder, 1);
      if (originalListId !== newListId) {
        droppedTaskEl.remove();
      }
      this._saveTask(task, order, position, taskList);
    });
  },

  _newOrder(number, sign) {
    let decimal = this._isFloat(number) ? this._toFraction(number) : 0.5;
    if (sign === -1) {
      return number - decimal;
    } else if (sign === 1) {
      return number + decimal;
    }
  },

  _saveTask(task, order, position, taskList) {
    let tasks = get(taskList, 'tasks');
    setProperties(task, { order, position });

    // We do pushObject because sorting does not work correctly unless
    // the task is pushed onto the task list array.
    tasks.pushObject(task);
    task.save();
    // TODO: If save() fails then we have a task pushed onto a task
    // list that is not actually in that task list
    // We should consider error handling here
  },

  _toFraction(number) {
    let numberString = number.toString();
    let [, decimalPortion] = numberString.split('.');
    return Number(decimalPortion);
  }
});
