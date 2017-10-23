import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  projectSkillsList: service(),
  session: service(),

  model() {
    return this.modelFor('project').reload();
  },

  beforeModel() {
    // we need to deal with overriding the `AuthenticatedRouteMixin`
    let isAuthenticated = get(this, 'session.isAuthenticated');

    if (isAuthenticated) {
      return this._ensureUserHasCredentials(...arguments);
    } else {
      // call `beforeModel` in `AuthenticatedRouteMixin`
      return this._super(...arguments);
    }
  },

  afterModel(project) {
    get(this, 'projectSkillsList').setProject(project);
  },

  _ensureUserHasCredentials() {
    let project = this.modelFor('project');
    // TODO: As things grow, this will be problematic. We need to wait to load
    // all project user records here. Solutions are
    // 1. Sideload project user records
    // 2. Have the server compute an ability table for the current user
    return get(project, 'projectUsers').then(() => {
      if (this.cannot('manage project', project)) {
        return this.transitionTo('project');
      }
    });
  }
});
