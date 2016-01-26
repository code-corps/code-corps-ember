import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-item'],
  classNameBindings: ['post.postType']
});
