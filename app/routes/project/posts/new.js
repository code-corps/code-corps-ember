import { computed } from 'ember-can';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  credentials: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  ability: computed.ability('organization', 'currentUserMembership'),

  canCreateTask: Ember.computed.alias('ability.canCreateTaskPost'),
  currentUserMembership: Ember.computed.alias('credentials.currentUserMembership'),

  postType: Ember.computed('canCreateTask', function() {
    return this.get('canCreateTask') ? 'task' : 'issue';
  }),

  model() {
    return this.modelFor('project');
  },

  setupController(controller, model) {
    let newPost = this.store.createRecord('post', {
      project: model,
      user: this.get('currentUser.user'),
      postType: this.get('postType'),
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
