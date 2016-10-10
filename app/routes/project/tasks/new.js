import EmberCan from 'ember-can';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  computed,
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  credentials: service(),
  currentUser: service(),

  ability: EmberCan.computed.ability('organization', 'currentUserMembership'),

  canCreateTask: computed.alias('ability.canCreateTaskTask'),
  currentUserMembership: computed.alias('credentials.currentUserMembership'),

  taskType: computed('canCreateTask', function() {
    return this.get('canCreateTask') ? 'task' : 'issue';
  }),

  model() {
    return this.modelFor('project');
  },

  setupController(controller, model) {
    let newTask = this.store.createRecord('task', {
      project: model,
      user: this.get('currentUser.user'),
      taskType: this.get('taskType')
    });
    controller.set('task', newTask);
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
