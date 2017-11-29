import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    approved: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('project', {
      approved: params.approved
    });
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});
