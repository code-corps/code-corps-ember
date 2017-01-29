import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  set
} = Ember;

export default Route.extend({
  currentUser: service(),

  model(params) {
    let projectId = this.modelFor('project').id;
    let { number } = params;

    return this.store.queryRecord('task', { projectId, number });
  },

  setupController(controller, task) {
    let user = get(this, 'currentUser.user');
    let newComment = this.store.createRecord('comment', { user });
    controller.setProperties({ newComment, task });
  },

  actions: {
    save(task) {
      return task.save().catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.task').set('error', error);
        }
      });
    },

    saveComment(comment) {
      let task = get(this, 'controller.task');
      set(comment, 'task', task);
      comment.save().catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.task').set('error', error);
        }
      });
    }
  }
});
