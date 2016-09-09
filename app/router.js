import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('login');

  this.route('organizations', function() {
    this.route('slugged-route', { path: '/:slugged_route_slug' }, function() {
      this.route('settings', function() {
        this.route('profile');
      });
    });
  });

  this.route('project', { path: '/:slugged_route_slug/:project_slug' }, function() {
    this.route('settings', function() {
      this.route('contributors');
      this.route('profile');
    });
    this.route('posts', function() {
      this.route('new');
      this.route('post', { path: '/:number' });
    });
  });

  this.route('projects', { path: '/:slugged_route_slug/projects'});

  this.route('projects-list', { path: '/projects'});

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

  this.route('slugged-route', { path: '/:slugged_route_slug' });
  this.route('team');
  this.route('about');

  this.route('organization', function() {
    this.route('settings', function() {});
  });
});

export default Router;
