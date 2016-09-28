import Ember from 'ember';

export default Ember.Controller.extend({
  page: 1,
  taskStatus: 'open',
  taskType: null,
  types: [
    Ember.Object.create({
      name: "Tasks",
      param: "task",
      slug: "tasks",
      selected: false,
    }),
    Ember.Object.create({
      name: "Issues",
      param: "issue",
      slug: "issues",
      selected: false,
    }),
    Ember.Object.create({
      name: "Ideas",
      param: "idea",
      slug: "ideas",
      selected: false,
    }),
  ],

  status: Ember.computed.alias('taskStatus'),

  isFilteringClosedTasks: Ember.computed.equal('status', 'closed'),
  isFilteringOpenTasks: Ember.computed.equal('status', 'open'),
  isFilteredByType: Ember.computed.notEmpty('taskTypes'),
  isFiltered: Ember.computed.or('isFilteredByType'),

  taskTypes: Ember.computed('taskType', function() {
    var taskTypes;
    let array = this.get('taskType');

    if (array) {
      taskTypes = array.split(',');
    } else {
      taskTypes = [];
    }

    return taskTypes;
  }),

  selectedTypes: Ember.computed('types', 'taskTypes', function() {
    let types = this.get('types');
    types.forEach((type) => {
      let taskTypes = this.get('taskTypes');

      if(taskTypes.includes(type.get('param'))) {
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

      if(taskTypes.includes(typeParam)) {
        taskTypes.removeObject(typeParam);
      } else {
        taskTypes.pushObject(typeParam);
      }

      if(Ember.isEmpty(taskTypes)) {
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

      if(taskTypes.includes(typeParam)) {
        taskTypes.removeObject(typeParam);
      }

      if(Ember.isEmpty(taskTypes)) {
        this.set('taskType', null);
      } else {
        let types = taskTypes.join(',');
        this.set('taskType', types);
      }

      this.resetPage();
    },

    filterByStatus(status) {
      this.set('taskStatus', status);
    },
  }
});
