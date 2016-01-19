import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('member', { path: '/:memberSlug' });
  this.route('project', { path: '/:memberSlug/:projectSlug' }, function() {
    this.route('posts', function() {
      this.route('new');
    });
    this.route('post', { path: '/post/:post_id' });
  });
});

export default Router;
