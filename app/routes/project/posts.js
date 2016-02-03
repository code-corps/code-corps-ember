import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let project = this.modelFor('project');
    return project;
  }
});
