import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  session: service(),

  beforeModel() {
    let organization = this.modelFor('organizations.slugged-route');
    if (this.cannot('manage organization', organization)) {
      return this.transitionTo('index');
    }
  }
});
