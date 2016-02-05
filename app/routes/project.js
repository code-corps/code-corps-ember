import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.queryRecord('project', {
      slug: params.project_slug,
      sluggedRouteSlug: params.slugged_route_slug
    });
  },

  serialize: function(model) {
    if (model) {
      return {
        slugged_route_slug: model.get('organization.slug'),
        project_slug: model.get('slug')
      };
    } else {
      return this._super(...arguments);
    }
  }
});
