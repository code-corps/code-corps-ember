import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.queryRecord('project', {
      slug: params.project_slug,
      sluggedRouteSlug: params.slugged_route_slug
    });
  },

  credentials: Ember.inject.service(),

  afterModel: function(model) {
    return model.get('organization').then((organization) => {
      this.get('credentials').setOrganization(organization);
      return this._super(...arguments);
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
