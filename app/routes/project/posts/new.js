import Ember from 'ember';

export default Ember.Route.extend({
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
    viewPost(post) {
      this.transitionTo('project.posts.post', post);
    }
  }
});
