import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  currentUser: service(),

  model(params) {
    let projectId = this.modelFor('project').id;
    let { number } = params;

    return this.store.queryRecord('task', { projectId, number });
  },

  setupController(controller, task) {
    let user = this.get('currentUser.user');
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
      let task = this.get('controller.task');
      comment.set('task', task);
      comment.save().catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.task').set('error', error);
        }
      });
    }
  }
});
