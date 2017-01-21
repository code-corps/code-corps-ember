import EmberCan from 'ember-can';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  computed,
  get,
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  credentials: service(),
  currentUser: service(),

  ability: EmberCan.computed.ability('organization', 'membership'),

  canCreateTask: computed.alias('ability.canCreateTaskTask'),
  membership: computed.alias('credentials.membership'),

  taskType: computed('canCreateTask', function() {
    return get(this, 'canCreateTask') ? 'task' : 'issue';
  }),

  model() {
    return this.modelFor('project').reload().then((project) => {
      let taskLists = project.get('taskLists');
      return RSVP.hash({ project, taskLists });
    });
  },

  setupController(controller, { project }) {
    let newTask = this.store.createRecord('task', {
      project,
      taskList: get(project, 'inboxTaskList'),
      taskType: get(this, 'taskType'),
      user: get(this, 'currentUser.user')
    });
    // controller.set('task', newTask);
    controller.setProperties({ project, task: newTask });
  },

  actions: {
    saveTask(task) {
      task.save().then((task) => {
        this.transitionTo('project.tasks.task', task.get('number'));
      }).catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.new').set('error', error);
        }
      });
    }
  }
});
