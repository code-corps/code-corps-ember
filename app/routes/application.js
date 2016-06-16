import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  flashMessages: service(),
  metrics: service(),
  onboarding: service(),

  isOnboarding: Ember.computed.alias('onboarding.isOnboarding'),
  onboardingRoute: Ember.computed.alias('onboarding.currentRoute'),

  beforeModel(transition) {
    return this._loadCurrentUser().then(() => {
      if (this._shouldTransitionToOnboardingRoute(transition)) {
        return this.transitionTo(this.get('onboardingRoute'));
      } else {
        return this._super(...arguments);
      }
    }).catch(() => this._invalidateSession());
  },

  sessionAuthenticated() {
    return this._loadCurrentUser()
      .then(() => {
        this._attemptTransition();
        this._trackAuthentication();
      })
      .catch(() => this._invalidateSession());
  },

  actions: {
    didTransition: function() {
      // Clear flash messages on every transition
      this.get('flashMessages').clearMessages();
      return true; // Bubble the event
    },

    willTransition(transition) {
      if (this._shouldTransitionToOnboardingRoute(transition)) {
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

  _attemptTransition() {
    if (this.get('isOnboarding')) {
      this.transitionTo(this.get('onboardingRoute'));
    } else {
      let attemptedTransition = this.get('session.attemptedTransition');
      if (Ember.isPresent(attemptedTransition)) {
        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      } else {
        this.transitionTo('projects-list');
      }
    }
  },

  _loadCurrentUser() {
    return this.get('currentUser').loadCurrentUser();
  },

  _invalidateSession() {
    this.get('session').invalidate();
  },

  _shouldTransitionToOnboardingRoute(transition) {
    let isOnboarding = this.get('isOnboarding');

    let onboardingRoutes = ['start.interests', 'start.expertise', 'start.skills'];
    let targetRoute = transition.targetName;
    let isTransitionToOnboardingRoute = (onboardingRoutes.indexOf(targetRoute) > -1);

    return isOnboarding && !isTransitionToOnboardingRoute;
  },

  _trackAuthentication() {
    Ember.get(this, 'metrics').trackEvent({
      event: 'Signed In'
    });
  }
});
