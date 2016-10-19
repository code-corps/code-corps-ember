import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'code-corps-ember/config/environment';

const {
  computed,
  get,
  inject: { service },
  isPresent,
  Route
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  flashMessages: service(),
  metrics: service(),
  onboarding: service(),

  isOnboarding: computed.alias('onboarding.isOnboarding'),
  onboardingRoute: computed.alias('onboarding.currentRoute'),

  headTags: [
    {
      type: 'link',
      tagId: 'link-canonical',
      attrs: {
        rel: 'canonical',
        content: ENV.WEB_BASE_URL
      }
    },
    {
      type: 'meta',
      tagId: 'meta-description',
      attrs: {
        property: 'description',
        content: 'Contribute to software projects for social good. Give your time or money to help build software to better the arts, education, government, science, and more.'
      }
    },
    {
      type: 'meta',
      tagId: 'meta-og-description',
      attrs: {
        property: 'og:description',
        content: 'Contribute to software projects for social good. Give your time or money to help build software to better the arts, education, government, science, and more.'
      }
    },
    {
      type: 'meta',
      tagId: 'meta-og-image',
      attrs: {
        property: 'og:image',
        content: 'https://d3pgew4wbk2vb1.cloudfront.net/images/universal-card.png'
      }
    },
    {
      type: 'meta',
      tagId: 'meta-og-site-name',
      attrs: {
        property: 'og:site_name',
        content: 'Code Corps'
      }
    },
    {
      type: 'meta',
      tagId: 'meta-og-title',
      attrs: {
        property: 'og:title',
        content: 'Code Corps | Build a better future.'
      }
    },
    {
      type: 'meta',
      tagId: 'meta-og-type',
      attrs: {
        property: 'og:type',
        content: 'website'
      }
    },
    {
      type: 'meta',
      tagId: 'meta-og-url',
      attrs: {
        property: 'og:url',
        content: ENV.WEB_BASE_URL
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-card',
      attrs: {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-creator',
      attrs: {
        name: 'twitter:creator',
        content: '@thecodecorps'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-creator-id',
      attrs: {
        name: 'twitter:creator:id',
        content: '4608917052'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-description',
      attrs: {
        name: 'twitter:description',
        content: 'Contribute to software projects for social good. Give your time or money to help build software to better the arts, education, government, science, and more.'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-image',
      attrs: {
        name: 'twitter:image',
        content: 'https://d3pgew4wbk2vb1.cloudfront.net/images/universal-card.png'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-site',
      attrs: {
        name: 'twitter:site',
        content: '@thecodecorps'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-site-id',
      attrs: {
        name: 'twitter:site:id',
        content: '4608917052'
      }
    },
    {
      type: 'meta',
      tagId: 'twitter-title',
      attrs: {
        name: 'twitter:title',
        content: 'Code Corps | Build a better future.'
      }
    }
  ],

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
    didTransition() {
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
    }
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
      if (isPresent(attemptedTransition)) {
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

    let onboardingRoutes = this.get('onboarding.routes');
    let targetRoute = transition.targetName;
    let isTransitionToOnboardingRoute = (onboardingRoutes.indexOf(targetRoute) > -1);

    return isOnboarding && !isTransitionToOnboardingRoute;
  },

  _trackAuthentication() {
    get(this, 'metrics').trackEvent({
      event: 'Signed In'
    });
  }
});
