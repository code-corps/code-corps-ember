import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  can: service(),
  session: service(),

  beforeModel() {
    let organization = this.modelFor('organizations.slugged-route');
    if (get(this, 'can').cannot('manage organization', organization)) {
      return this.transitionTo('index');
    }
  }
});
