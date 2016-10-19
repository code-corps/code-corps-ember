import Ember from 'ember';

const {
  merge,
  Route
 } = Ember;

export default Route.extend({
  queryParams: {
    page: { refreshModel: true, scope: 'controller' },
    taskType: { refreshModel: true, scope: 'controller' },
    status: { refreshModel: true, scope: 'controller' }
  },

  model(params) {
    let project = this.modelFor('project');
    let fullParams = merge(params, { projectId: project.get('id') });
    return this.get('store').query('task', fullParams);
  },

  setupController(controller) {
    controller.set('project', this.modelFor('project'));
    this._super(...arguments);
  },

  // there is a semi-known ember bug, where a query parameter with an initial value not set to null
  // and then later set to null, will have its value serialized as "null" (string)
  // we fix this here
  deserializeQueryParam(value, urlKey, defaultValueType) {
    if (urlKey === 'status' && value === 'null') {
      return null;
    } else {
      return this._super(value, urlKey, defaultValueType);
    }
  }
});
