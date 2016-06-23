import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let project = this.modelFor('project');
    return project;
  },
});
