import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['project-settings-menu', 'settings-menu'],

  credentials: service(),
  session: service()
});
