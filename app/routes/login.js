import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import MarketingRouteMixin from 'code-corps-ember/mixins/marketing-route-mixin';

export default Route.extend(MarketingRouteMixin, UnauthenticatedRouteMixin, { });
