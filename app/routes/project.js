import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    debugger;
    return this.store.find('project', { id: params.project_slug });
  }
});
