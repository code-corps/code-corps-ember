import Ember from 'ember';

const {
  Route,
  RSVP,
  inject: { service },
  isPresent
} = Ember;

export default Route.extend({
  currentUser: service(),

  model(params) {
    let projectId = this.modelFor('project').id;
    let queryParams = {
      projectId,
      number: params.number
    };

    let userId = this.get('currentUser.user.id');

    return RSVP.hash({
      task: this.store.queryRecord('task', queryParams),
      user: isPresent(userId) ? this.store.find('user', userId) : null
    }).then((result) => {
      return RSVP.hash({
        task: result.task,
        comment: this.store.createRecord('comment', { task: result.task, user: result.user }),
        comments: this.store.query('comment', { taskId: result.task.id })
      });
    });
  },

  setupController(controller, models) {
    this._super(controller, models);
    controller.set('task', models.task);
    controller.set('newComment', models.comment);
    controller.set('comments', models.comments);
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
      let route = this;
      comment.save().then(() => {
        route.refresh();
      }).catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.task').set('error', error);
        }
      });
    }
  }
});
