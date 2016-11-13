import Ember from 'ember';

const {
  computed,
  Controller,
  isEmpty,
  Object
} = Ember;

export default Controller.extend({
  page: 1,
  taskStatus: 'open',
  taskType: null,
  types: [
    Object.create({
      name: 'Tasks',
      param: 'task',
      slug: 'tasks',
      selected: false
    }),
    Object.create({
      name: 'Issues',
      param: 'issue',
      slug: 'issues',
      selected: false
    }),
    Object.create({
      name: 'Ideas',
      param: 'idea',
      slug: 'ideas',
      selected: false
    })
  ],

  status: computed.alias('taskStatus'),

  isFilteringClosedTasks: computed.equal('status', 'closed'),
  isFilteringOpenTasks: computed.equal('status', 'open'),
  isFilteredByType: computed.notEmpty('taskTypes'),
  isFiltered: computed.or('isFilteredByType'),

  taskTypes: computed('taskType', function() {
    let taskTypes;
    let array = this.get('taskType');

    if (array) {
      taskTypes = array.split(',');
    } else {
      taskTypes = [];
    }

    return taskTypes;
  }),

  selectedTypes: computed('types', 'taskTypes', function() {
    let types = this.get('types');
    types.forEach((type) => {
      let taskTypes = this.get('taskTypes');

      if (taskTypes.includes(type.get('param'))) {
        type.set('selected', true);
      } else {
        type.set('selected', false);
      }
      return type;
    });
    return types;
  }),

  resetPage() {
    this.set('page', 1);
  },

  actions: {
    filterByType(type) {
      let taskTypes = this.get('taskTypes');
      let typeParam = type.get('param');

      if (taskTypes.includes(typeParam)) {
        taskTypes.removeObject(typeParam);
      } else {
        taskTypes.pushObject(typeParam);
      }

      if (isEmpty(taskTypes)) {
        this.set('taskType', null);
      } else {
        let types = taskTypes.join(',');
        this.set('taskType', types);
      }

      this.resetPage();
    },

    removeTypeFilter(type) {
      let taskTypes = this.get('taskTypes');
      let typeParam = type.get('param');

      if (taskTypes.includes(typeParam)) {
        taskTypes.removeObject(typeParam);
      }

      if (isEmpty(taskTypes)) {
        this.set('taskType', null);
      } else {
        let types = taskTypes.join(',');
        this.set('taskType', types);
      }

      this.resetPage();
    },

    filterByStatus(status) {
      this.set('taskStatus', status);
    }
  }
});
