import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    let project = this.modelFor('project');
    return this.get('store').query('post', { projectId: project.get('id'), page: { number: 1 } });
  },

  setupController(controller, model) {
    controller.set('posts', model);
  },

  actions: {
    reloadPosts(filters) {
      let project = this.modelFor('project');
      filters.projectId = project.get('id');

      this.get('store').query('post', filters).then((posts) => {
        this.controllerFor('project.posts.index').set('posts', posts);
      });
    },
  }
});
