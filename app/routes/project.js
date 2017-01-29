import Ember from 'ember';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  model(params) {
    return this.store.queryRecord('project', {
      slug: params.project_slug,
      sluggedRouteSlug: params.slugged_route_slug
    }, { reload: true });
  },

  credentials: service(),

  afterModel(model) {
    return get(model, 'organization').then((organization) => {
      get(this, 'credentials').setOrganization(organization);
      return this._super(...arguments);
    });
  },

  serialize(model) {
    return {
      slugged_route_slug: get(model, 'organization.slug'),
      project_slug: get(model, 'slug')
    };
  }
});
