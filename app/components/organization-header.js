import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['organization-header'],
  classNameBindings: ['expanded'],
  expanded: false,
});
