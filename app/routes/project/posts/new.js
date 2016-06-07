import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),

  model() {
    return this.modelFor('project');
  },

  setupController(controller, model) {
    let newPost = this.store.createRecord('post', {
      project: model,
      user: this.get('currentUser.user'),
      postType: 'task',
    });
    controller.set('post', newPost);
  },

  actions: {
    savePost(post) {
      post.save().then((post) => {
        this.transitionTo('project.posts.post', post.get('number'));
      }).catch((error) => {
        if (error.errors.length === 1) {
          this.controllerFor('project.posts.new').set('error', error);
        }
      });
    },
  },
});
