import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('member', { path: '/:memberSlug' }, function() {
    this.route('project', { path: '/:projectSlug' });
  });
});

export default Router;
