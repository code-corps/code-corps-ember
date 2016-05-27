import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-details'],
  classNameBindings: ['expanded'],

  expanded: false,
});
