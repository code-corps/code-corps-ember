import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['organization-header'],
  classNameBindings: ['expanded'],
  expanded: false
});
