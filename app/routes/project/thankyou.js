import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
});
