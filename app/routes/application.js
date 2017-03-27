import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'code-corps-ember/config/environment';
import LoadingBar from 'code-corps-ember/mixins/loading-bar';

const {
  computed,
  get,
  inject: { service },
  isPresent,
  Route,
  set
} = Ember;

export default Route.extend(ApplicationRouteMixin, LoadingBar, {
  currentUser: service(),
  flashMessages: service(),
  metrics: service(),
  onboarding: service(),

  isOnboarding: computed.alias('onboarding.isOnboarding'),
  onboardingRoute: computed.alias('onboarding.routeForCurrentStep'),

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
    return this._loadCurrentUser()
      .then(() => {
        if (this._shouldRedirectToOnboarding(transition)) {
          return this.transitionTo(get(this, 'onboardingRoute'));
        } else {
          return this._super(...arguments);
        }
      })
      .catch(() => this._invalidateSession());
  },

  sessionAuthenticated() {
    return this._loadCurrentUser()
      .then(() => {
        this._attemptTransitionAfterAuthentication();
        this._trackAuthentication();
      })
      .catch(() => this._invalidateSession());
  },

  actions: {
    willTransition(transition) {
      if (this._shouldRedirectToOnboarding(transition)) {
        transition.abort();
        this.transitionTo(get(this, 'onboardingRoute'));
      }
    },

    // see https://github.com/emberjs/ember.js/issues/12791
    // if we don't handle the error action at application level
    // the error will continue to be thrown, causing tests to fail
    // and the error will output to console, even though we technically
    // "handled" it with our application_error route/template
    error(e) {
      console.error(e);
      this.intermediateTransitionTo('application_error', e);
    }
  },

  // The default beahavior for an ember-simple-auth ApplicationRouteMixin is to
  // Either got back to the route the user tried to access before being
  // redirected to login/signup, or if there is no such route, go to the default
  // route.
  //
  // This slightly extends this behavior by sending the user to the onboarding
  // route if it's determined that should be the case. If there was a stored
  // route, for example, if a non-signed-in user tried to donate, then that
  // still takes precedence.
  _attemptTransitionAfterAuthentication() {
    let attemptedTransition = get(this, 'session.attemptedTransition');
    if (isPresent(attemptedTransition)) {
      attemptedTransition.retry();
      set(this, 'session.attemptedTransition', null);
    } else if (get(this, 'isOnboarding')) {
      this.transitionTo(get(this, 'onboardingRoute'));
    } else {
      this.transitionTo('projects-list');
    }
  },

  _invalidateSession() {
    get(this, 'session').invalidate();
  },

  _loadCurrentUser() {
    return get(this, 'currentUser').loadCurrentUser();
  },

  // If the user is still in the process of onboarding, they are allowd to visit
  // only select routes. Trying to access any other route redirects them to
  // their next onboarding route.
  //
  // This function returns true if that should happen.
  _shouldRedirectToOnboarding(transition) {
    let isOnboarding = get(this, 'isOnboarding');
    let allowedRoutes = get(this, 'onboarding.allowedRoutes');
    let targetRoute = transition.targetName;
    let isTransitionToAllowedRoute = (allowedRoutes.indexOf(targetRoute) > -1);

    return isOnboarding && !isTransitionToAllowedRoute;
  },

  _trackAuthentication() {
    get(this, 'metrics').trackEvent({
      event: 'Signed In'
    });
  }
});
