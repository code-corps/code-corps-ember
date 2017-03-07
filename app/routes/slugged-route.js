import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    });
  }
});
