import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

const {
  get,
  Route,
  inject: { service }
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
    if (this.cannot('manage project', project)) {
      return this.transitionTo('project');
    }
  }
});
