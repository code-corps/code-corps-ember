import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';

const {
  computed: {
    alias
  },
  get,
  getProperties,
  inject: { service },
  Service,
  set
} = Ember;

export default Service.extend({
  store: service(),

  taskSkills: alias('task.taskSkills'),

  add(skill) {
    let { store, task } = getProperties(this, 'store', 'task');
    return store.createRecord('task-skill', { task, skill }).save();
  },

  includes(skill) {
    let taskSkills = get(this, 'taskSkills');
    return recordsList.includes(taskSkills, skill);
  },

  find(skill) {
    let { taskSkills, task } = getProperties(this, 'taskSkills', 'task');
    return recordsList.find(taskSkills, skill, task);
  },

  remove(skill) {
    let taskSkill = this.find(skill);
    return taskSkill.destroyRecord();
  },

  setTask(task) {
    set(this, 'task', task);
    return this._refresh();
  },

  toggle(skill) {
    let taskSkills = get(this, 'taskSkills');
    if (recordsList.includes(taskSkills, skill)) {
      return this.remove(skill);
    } else {
      return this.add(skill);
    }
  },

  _refresh() {
    return get(this, 'taskSkills').reload();
  }
});
