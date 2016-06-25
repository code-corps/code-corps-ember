import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-status-button'],
  tagName: 'span',

  isOpen: Ember.computed.equal('post.status', 'open'),

  actions: {
    closePost() {
      let post = this.get('post');
      post.set('status', 'closed');
      return post.save();
    },

    reopenPost() {
      let post = this.get('post');
      post.set('status', 'open');
      return post.save();
    },
  }
});
