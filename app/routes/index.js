import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import MarketingRouteMixin from 'code-corps-ember/mixins/marketing-route-mixin';

export default Route.extend(MarketingRouteMixin, {
  session: service(),

  beforeModel() {
    if (get(this, 'session.isAuthenticated')) {
      this.transitionTo('projects-list');
    }
  }
});
