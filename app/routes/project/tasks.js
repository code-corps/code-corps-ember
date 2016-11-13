import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    let project = this.modelFor('project');
    return project;
  }
});
