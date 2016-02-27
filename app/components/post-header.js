import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-header'],
  classNameBindings: ['post.postType'],

  actions: {
    savePostTitle: function() {
      this.sendAction();
    }
  }
});
