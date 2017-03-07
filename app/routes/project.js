import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(params) {
    return this.store.queryRecord('project', {
      slug: params.project_slug,
      sluggedRouteSlug: params.slugged_route_slug
    }, { reload: true });
  },

  serialize(model) {
    return {
      slugged_route_slug: model.get('organization.slug'),
      project_slug: model.get('slug')
    };
  }
});
