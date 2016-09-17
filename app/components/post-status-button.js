import Ember from 'ember';

/**
  The post-status-button component is a button that is used for closing and
  re-opening posts.

  @class post-status-button
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-status-button'],
  tagName: 'span',

  /**
    Computed property that checks if the post is open.

    @property isOpen
    @type Boolean
   */
  isOpen: Ember.computed.equal('post.status', 'open'),

  actions: {

    /**
      Action that sets the posts status to `closed` and saves the post.

      @method closePost
     */
    closePost() {
      let post = this.get('post');
      post.set('status', 'closed');
      return post.save();
    },

    /**
      Action that sets the posts status to `open` and saves the post.

      @method reopenPost
     */
    reopenPost() {
      let post = this.get('post');
      post.set('status', 'open');
      return post.save();
    },
  }
});
