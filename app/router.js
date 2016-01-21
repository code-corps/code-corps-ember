import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('profile', { path: '/settings/profile' });
  this.route('slugged-route', { path: '/:sluggedRouteSlug' });
  this.route('project', { path: '/:sluggedRouteSlug/:projectSlug' });
});

export default Router;
