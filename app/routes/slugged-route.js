import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_rute_slug
    });
  }
});
