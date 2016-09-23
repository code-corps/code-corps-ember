import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),

  model(params) {
    let projectId = this.modelFor('project').id;
    let queryParams = {
      projectId: projectId,
      number: params.number
    };

    let userId = this.get('currentUser.user.id');

    return Ember.RSVP.hash({
      task: this.store.queryRecord('task', queryParams),
      user: Ember.isPresent(userId) ? this.store.find('user', userId) : null
    }).then((result) => {
      return Ember.RSVP.hash({
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
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422 );

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
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422 );

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.task').set('error', error);
        }
      });
    }
  }
});
