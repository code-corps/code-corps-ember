import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['organization-header'],
  classNameBindings: ['expanded'],
  expanded: false,

  credentials: service()
});
