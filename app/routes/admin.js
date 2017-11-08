import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AdminRouteMixin from 'code-corps-ember/mixins/admin-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, AdminRouteMixin, { });
