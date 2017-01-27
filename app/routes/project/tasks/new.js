import EmberCan from 'ember-can';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  computed,
  get,
  inject: { service },
  Route,
  RSVP,
  set,
  setProperties
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  credentials: service(),
  currentUser: service(),

  ability: EmberCan.computed.ability('organization', 'membership'),
  membership: computed.alias('credentials.membership'),

  model() {
    let project = this.modelFor('project').reload();
    let taskType = this._getTaskType();
    let user = get(this, 'currentUser.user');

    return RSVP.hash({ project, taskType, user });
  },

  setupController(controller, { project, taskType, user }) {
    let store = get(this, 'store');
    let task = store.createRecord('task', { project, taskType, user });

    setProperties(controller, { project, task });
  },

  actions: {
    async saveTask(task) {
      let controller = this.controllerFor('project.tasks.new');
      let project = get(controller, 'project');
      let inboxTaskList = await this._getInboxTaskList(project);

      set(task, 'taskList', inboxTaskList);

      return task.save()
                 .then((task) => this._transitionToTask(task))
                 .catch((payload) => this._handleTaskSaveError(controller, payload));
    },

    willTransition(transition) {
      let task = get(this, 'controller.task');

      // prompt to confirm if the user did not save
      if (get(task, ('isNew'))) {
        let confirmed = window.confirm('You will lose any unsaved information if you leave this page. Are you sure?');
        if (confirmed) {
          task.destroyRecord();
        } else {
          transition.abort();
        }
      }
    }
  },

  async _getTaskType() {
    let canCreateTask = await get(this, 'ability.canCreateTaskTask');
    return canCreateTask ? 'task' : 'issue';
  },

  async _getInboxTaskList(project) {
    let taskLists = await get(project, 'taskLists');
    let inboxes = taskLists.filterBy('inbox', true);

    return get(inboxes, 'firstObject');
  },

  _handleTaskSaveError(controller, payload) {
    if (!this._payloadContainsValidationErrors(payload)) {
      set(controller, 'error', payload);
    }
  },

  _payloadContainsValidationErrors(payload) {
    return payload.errors.some((error) => error.status === 422);
  },

  _transitionToTask(task) {
    this.transitionTo('project.tasks.task', get(task, 'number'));
  }
});
