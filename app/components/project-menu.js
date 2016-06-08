import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-menu', 'horizontal-menu'],
  tagName: 'ul',

  credentials: Ember.inject.service(),
  session: Ember.inject.service(),
});
