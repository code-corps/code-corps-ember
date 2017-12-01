import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  model(params) {
    return this.store.queryRecord('project', {
      slug: params.project_slug,
      sluggedRouteSlug: params.slugged_route_slug
    }, { reload: true });
  },

  serialize(model) {
    return {
      slugged_route_slug: get(model, 'organization.slug'),
      project_slug: get(model, 'slug')
    };
  },

  actions: {
    submitForReview(project) {
      set(project, 'approvalRequested', true);
      project
        .save()
        .catch(() => project.rollbackAttributes());
    }
  }
});
