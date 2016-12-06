import Ember from 'ember';

const {
  get,
  merge,
  Route,
  RSVP
 } = Ember;

export default Route.extend({
  queryParams: {
    page: { refreshModel: true, scope: 'controller' },
    taskType: { refreshModel: true, scope: 'controller' },
    status: { refreshModel: true, scope: 'controller' }
  },

  model(params) {
    let project = this.modelFor('project');

    let projectId = project.get('id');
    let fullParams = merge(params, { projectId });

    let tasks =  get(this, 'store').query('task', fullParams);

    return RSVP.hash({ project, tasks });
  },

  setupController(controller, { project, tasks }) {
    controller.setProperties({ project, tasks });
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
