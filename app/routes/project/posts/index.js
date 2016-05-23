import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: { refreshModel: true, scope: 'controller' },
    postType: { refreshModel: true, scope: 'controller' }
  },

  session: Ember.inject.service(),

  model(params) {
    let project = this.modelFor('project');
    let fullParams = Ember.merge(params, {
      projectId: project.get('id')
    });
    return this.get('store').query('post', fullParams);
  },

  setupController(controller, model) {
    controller.set('posts', model);
  }
});
