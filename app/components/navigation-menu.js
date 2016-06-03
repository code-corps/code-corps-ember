import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  classNames: ['menu', 'container'],

  currentUser: service(),
  navigationMenu: service(),
  onboarding: service(),
  session: service(),
});
