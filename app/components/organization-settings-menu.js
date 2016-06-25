import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['organization-settings-menu', 'settings-menu'],

  credentials: Ember.inject.service(),
  session: Ember.inject.service(),
});
