import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.queryRecord('project', {
      slug: params.projectSlug,
      memberSlug: params.memberSlug
    }).then(function(model) {
      return model;
    });
  }
});
