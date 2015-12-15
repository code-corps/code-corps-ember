import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var memberSlug = this.paramsFor('member').memberSlug;

    return this.store.queryRecord('project', {
      slug: params.projectSlug,
      memberSlug: memberSlug
    });
  }
});
