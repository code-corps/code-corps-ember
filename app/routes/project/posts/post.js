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
      post: this.store.queryRecord('post', queryParams),
      user: Ember.isPresent(userId) ? this.store.find('user', userId) : null
    }).then((result) => {
      return Ember.RSVP.hash({
        post: result.post,
        comment: this.store.createRecord('comment', { post: result.post, user: result.user }),
        comments: this.store.query('comment', { postId: result.post.id })
      });
    });
  },

  setupController(controller, models) {
    this._super(controller, models);
    controller.set('post', models.post);
    controller.set('newComment', models.comment);
    controller.set('comments', models.comments);
  },

  actions: {
    saveComment(comment) {
      let route = this;
      comment.save().then(() => {
        route.refresh();
      }).catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422 );

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.posts.post').set('error', error);
        }
      });
    },
  },
});
