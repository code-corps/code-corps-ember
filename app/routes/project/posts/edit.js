import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model(params) {
    let projectParams = this.paramsFor('project');
    let queryParams = {
      sluggedRouteSlug: projectParams.sluggedRouteSlug,
      projectSlug: projectParams.projectSlug,
      number: params.number
    };

    return this.store.queryRecord('post', queryParams);
  },

  setupController(controller, model) {
    controller.set('post', model);
  },

  actions: {
    savePost(post) {
      post.save().then((post) => {
        this.transitionTo('project.posts.post', post.get('number'));
      }).catch((error) => {
        if (error.errors.length === 1) {
          this.controllerFor('project.posts.edit').set('error', error);
        }
      });
    }
  }

});
