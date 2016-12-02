import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

const {
  get,
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  credentials: service(),
  session: service(),

  model() {
    return this.modelFor('project').reload();
  },

  beforeModel() {
    if (get(this, 'session.isAuthenticated')) {
      let organization = this.modelFor('project.organization');
      return get(this, 'credentials').fetchMembership().then((membership) => {
        if (this.cannot('manage organization', organization, { membership })) {
          return this.transitionTo('index');
        } else {
          return this._super(...arguments);
        }
      });
    } else {
      return this._super(...arguments);
    }
  }
});
