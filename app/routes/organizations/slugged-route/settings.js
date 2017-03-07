import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  session: service(),

  beforeModel() {
    let organization = this.modelFor('organizations.slugged-route');
    if (this.cannot('manage organization', organization)) {
      return this.transitionTo('index');
    }
  }
});
