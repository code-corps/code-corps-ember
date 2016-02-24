import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('profile', { path: '/settings/profile' });
  this.route('slugged-route', { path: '/:slugged_route_slug' });
  this.route('projects-list', { path: '/projects'});
  this.route('projects', { path: '/:slugged_route_slug/projects'});

  this.route('organizations', { path: '/organizations' }, function() {
    this.route('settings', { path: '/:slugged_route_slug/settings'}, function() {
      this.route('profile');
    });
  });

  this.route('project', { path: '/:slugged_route_slug/:project_slug' }, function() {
    this.route('settings', { path: '/settings' }, function() {
      this.route('profile');
    });
    this.route('posts', { path: '/posts' }, function() {
      this.route('new');
      this.route('post', { path: '/:number' });
    });
  });
});

export default Router;
