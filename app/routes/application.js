import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  flashMessages: service(),
  onboarding: service(),

  beforeModel() {
    this._super(...arguments);
    return this._loadCurrentUser().then((user) => {
      this._attemptTransition(user);
    });
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().then((user) => {
      this._attemptTransition(user);
    }).catch(() => {
      this.get('session').invalidate();
    });
  },

  actions: {
    didTransition: function() {
      // Clear flash messages on every transition
      this.get('flashMessages').clearMessages();
      return true; // Bubble the event
    },

    willTransition(transition) {
      let isOnboarding = this.get('onboarding.isOnboarding');
      let expectedOnboardingRoute = this.get('onboarding.currentRoute');
      let target = transition.targetName;
      if (isOnboarding && target !== expectedOnboardingRoute) {
        this._abortAndFixHistory(transition);
      }
    },

    // see https://github.com/emberjs/ember.js/issues/12791
    // if we don't handle the error action at application level
    // te error will continue to be thrown, causing tests to fail
    // and the error to be outputed to console, even though we technically
    // "handled" it with our application_error route/template
    error(e) {
      console.error(e);
      this.intermediateTransitionTo('application_error', e);
    },
  },

  _abortAndFixHistory(transition) {
    transition.abort();
    if (window.history) {
      window.history.forward();
    }
  },

  _attemptTransition(user) {
    if (this.get('onboarding.isOnboarding')) {
      this._transitionToOnboarding(user);
    }
  },

  _loadCurrentUser() {
    return this.get('currentUser').loadCurrentUser();
  },

  _transitionToOnboarding(user) {
    this.transitionTo(this._transitionDestination(user));
  },

  _transitionDestination() {
    return this.get('onboarding.currentRoute');
  },
});
