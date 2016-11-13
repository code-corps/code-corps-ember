import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['organization-settings-menu', 'settings-menu'],

  credentials: service(),
  session: service()
});
