import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const {
  computed: { alias },
  inject: { service },
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  user: alias('currentUser.user'),
  project: alias('model'),

  afterModel() {
    let subscriptions = this.get('user.stripeConnectSubscriptions');
    let subscribedToProject = subscriptions.find(function(subscription) {
      return subscription.get('stripeConnectPlan.project') == this.get('project');
    });
  }
});
