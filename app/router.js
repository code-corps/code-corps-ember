import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('member', { path: '/:member_slug' }, function() {
    this.route('project', { path: '/:project_slug' });
  });
  this.route('user');
});

export default Router;
