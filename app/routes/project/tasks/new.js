import { computed } from 'ember-can';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  credentials: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  ability: computed.ability('organization', 'currentUserMembership'),

  canCreateTask: Ember.computed.alias('ability.canCreateTaskTask'),
  currentUserMembership: Ember.computed.alias('credentials.currentUserMembership'),

  taskType: Ember.computed('canCreateTask', function() {
    return this.get('canCreateTask') ? 'task' : 'issue';
  }),

  model() {
    return this.modelFor('project');
  },

  setupController(controller, model) {
    let newTask = this.store.createRecord('task', {
      project: model,
      user: this.get('currentUser.user'),
      taskType: this.get('taskType'),
    });
    controller.set('task', newTask);
  },

  actions: {
    saveTask(task) {
      task.save().then((task) => {
        this.transitionTo('project.tasks.task', task.get('number'));
      }).catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422 );

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.new').set('error', error);
        }
      });
    },
  },
});
