import Ember from 'ember';
import { alias } from 'ember-computed';

const {
  Component,
  computed,
  get,
  inject,
  isEqual,
  set,
} = Ember;

const { service } = inject;

/**
  `comment-item` composes a comment

  ```handlebars
  {{comment-item comment=comment}}
  ```

  @class comment-item
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['comment-item', 'timeline-comment-wrapper'],
  classNameBindings: ['isEditing:editing'],

  /**
    @property currentUser
    @type Ember.Service
   */
  currentUser: service(),

  /**
    A service that is used for fetching mentions within a body of text.

    @property mentionFetcher
    @type Ember.Service
   */
  mentionFetcher: service(),

  /**
    Returns whether or not the current user can edit the current comment.

    @property canEdit
    @type Boolean
   */
  canEdit: alias('currentUserIsCommentAuthor'),

  /**
    Returns the comment author's ID.

    @property commentAuthorId
    @type Number
   */
  commentAuthorId: alias('comment.user.id'),

  /**
    Returns the current user's ID.

    @property currentUserId
    @type Number
   */
  currentUserId: alias('currentUser.user.id'),

  /**
    Consumes `currentUserId` and `commentAuthorId` and returns if the current
    user is the comment author.

    @property currentUserIsCommentAuthor
    @type Boolean
   */
  currentUserIsCommentAuthor: computed('currentUserId', 'commentAuthorId', function() {
    let userId = parseInt(get(this, 'currentUserId'), 10);
    let authorId = parseInt(get(this, 'commentAuthorId'), 10);

    return isEqual(userId, authorId);
  }),

  /**
    Overrides the init method, sets the `isEditing` property to `false`,
    prefetches mentions and calls the `super` on `init`.

    @method init
   */
  init() {
    set(this, 'isEditing', false);
    this._prefetchMentions(get(this, 'comment'));
    return this._super(...arguments);
  },

  actions: {

    /**
      Action that toggle editing of the corresponding comment.

      @method toggleEdit
     */
    toggleEdit() {
      this.toggleProperty('isEditing');
    },

    /**
      Action that saves the corresponding comment, turns off edit mode, and
      refetches the mentions.

      @method save
     */
    save() {
      let component = this;
      let comment = get(this, 'comment');

      comment.save().then((comment) => {
        component.set('isEditing', false);
        this._fetchMentions(comment);
      });
    },
  },

  /**
    Queries the store for body of text with mentions.

    @method _fetchMentions
    @param {Object} comment
    @private
   */
  _fetchMentions(comment) {
    get(this, 'mentionFetcher').fetchBodyWithMentions(comment, 'comment').then((body) => {
      set(this, 'commentBodyWithMentions', body);
    });
  },

  /**
    Parses the body of text and prefetches mentions.

    @method _prefetchMentions
    @param {Object} comment
    @private
   */
  _prefetchMentions(comment) {
    let body = get(this, 'mentionFetcher').prefetchBodyWithMentions(comment, 'comment');
    set(this, 'commentBodyWithMentions', body);
  },
});
