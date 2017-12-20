import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  conversations: service(),
  session: service(),
  store: service(),

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

  async model() {
    let project = this.modelFor('project');
    let projectId = get(project, 'id');
    let store = get(this, 'store');
    // peekAll returns a live array, so it will alse render any newly created
    // messages, causing the list to update properly on project.messages.new
    await store.query('conversation', { project_id: projectId });
    let conversations = store.peekAll('conversation');
    return { conversations, project };
  },

  renderTemplate() {
    this.render('project/conversations', { into: 'application' });
  },

  setupController(controller, { conversations, project }) {
    controller.setProperties({ conversations, project });
  },

  deactivate() {
    this._super(...arguments);
    get(this, 'conversations').deactivate();
    return true;
  },

  _ensureUserHasCredentials() {
    let project = this.modelFor('project');
    // TODO: As things grow, this will be problematic. We need to wait to load
    // all project user records here. Solutions are
    // 1. Sideload project user records
    // 2. Have the server compute an ability table for the current user
    return get(project, 'projectUsers').then(() => {
      if (this.cannot('administer project', project)) {
        return this.transitionTo('project');
      }
    });
  },

  actions: {
    didTransition() {
      this._super(...arguments);
      get(this, 'conversations').activate();
      return true;
    }
  }
});
