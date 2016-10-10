import Ember from 'ember';

const {
  Route,
  inject: { service }
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
    return model.get('organization').then((organization) => {
      this.get('credentials').setOrganization(organization);
      return this._super(...arguments);
    });
  },

  serialize(model) {
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
