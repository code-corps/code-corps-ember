import Ember from 'ember';
import config from './config/environment';

const {
  get,
  inject: { service },
  Router,
  run
} = Ember;

let AppRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      let page = document.location.pathname;
      let title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

AppRouter.map(function() {
  this.route('login');

  this.route('oauth-stripe', {
    path: '/oauth/stripe'
  });

  this.route('organizations', function() {
    this.route('slugged-route', {
      path: '/:slugged_route_slug'
    }, function() {
      this.route('settings', function() {
        this.route('profile');
      });
    });
  });

  this.route('project', { path: '/:slugged_route_slug/:project_slug' }, function() {
    this.route('settings', function() {
      this.route('contributors');
      this.route('donations', function() {
        this.route('goals');
        this.route('payments');
      });
      this.route('profile');
    });

    this.route('tasks', function() {
      this.route('new');
      this.route('task', { path: '/:number' });
    });
    this.route('donate');
    this.route('thank-you');
  });

  this.route('projects', {
    path: '/:slugged_route_slug/projects'
  });

  this.route('projects-list', {
    path: '/projects'
  });

  this.route('settings', function() {
    this.route('profile');
  });

  this.route('signup');

  this.route('start', function() {
    this.route('hello');
    this.route('interests');
    this.route('expertise');
    this.route('skills');
  });

  this.route('slugged-route', {
    path: '/:slugged_route_slug'
  });

  this.route('team');
  this.route('about');

  this.route('organization', function() {
    this.route('settings', function() { });
  });

  this.route('privacy');
  this.route('terms');
});

export default AppRouter;
