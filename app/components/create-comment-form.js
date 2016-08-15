import Ember from 'ember';

const {
  Component,
  get,
  inject,
} = Ember;

const { service } = inject;

/**
  `create-comment-form` composes the comment form. The comment form allows for
  editing and previewing the contents of a comment.

  ## default usage

  ```handlebars
  {{create-comment-form comment=comment saveComment='saveCommentAction'}}
  ```

  @class create-comment-form
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['create-comment-form'],
  tagName: 'form',

  /**
    @property session
    @type Ember.Service
   */
  session: service(),

  actions: {

    /**
      Action that sends the given `saveComment` action with the comment.

      @method saveComment
     */
    saveComment() {
      let comment = get(this, 'comment');

      this.sendAction('saveComment', comment);
    },
  },
});
