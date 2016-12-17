import Ember from 'ember';

const {
  get,
  inject: { service },
  Route
 } = Ember;

export default Route.extend({
  projectTaskBoard: service(),

  model() {
    return this.modelFor('project');
  },

  setupController(controller, project) {
    controller.setProperties({ project });
  },

  actions: {
    didTransition() {
      this._super(...arguments);
      get(this, 'projectTaskBoard').activate();
      return true;
    },

    willTransition() {
      this._super(...arguments);
      get(this, 'projectTaskBoard').deactivate();
      return true;
    }
  }
});
