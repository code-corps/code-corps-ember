import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model() {
    let userId =  this.get('session.session.authenticated.user_id');
    return Ember.RSVP.hash({
      user: Ember.isPresent('userId') ? this.store.findRecord('user', userId) : null,
      project: this.modelFor('project')
    });
  },

  setupController(controller, models) {
    let newPost = this.store.createRecord('post', {
      project: models.project,
      user: models.user });
    controller.set('post', newPost);
  },

  actions: {
    savePost(post) {
      post.set('state', 'published');
      post.save().then((post) => {
        this.transitionTo('project.posts.post', post.get('number'));
      }).catch((error) => {
        if (error.errors.length === 1) {
          this.controllerFor('project.posts.new').set('error', error);
        }
      });
    }
  }
});
