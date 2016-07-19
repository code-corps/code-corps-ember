import Ember from 'ember';

/**
  The post-details component composes a post object, it's author, info,
  and body.

  ## default usage

  ```handlebars
  {{post-details post=post}}
  ```

  @class post-details
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-details'],

  /**
    @property currentUser
    @type Ember.Service
   */
  currentUser: Ember.inject.service(),

  /**
    A service that is used for fetching mentions within a body of text.

    @property mentionFetcher
    @type Ember.Service
   */
  mentionFetcher: Ember.inject.service(),

  /**
    Returns whether or not the current user can edit the current post.

    @property canEdit
    @type Boolean
   */
  canEdit: Ember.computed.alias('currentUserIsPostAuthor'),

  /**
    Returns the current user's ID.

    @property currentUserId
    @type Number
   */
  currentUserId: Ember.computed.alias('currentUser.user.id'),

  /**
    Returns the post author's ID.

    @property postAuthorId
    @type Number
   */
  postAuthorId: Ember.computed.alias('post.user.id'),

  /**
    Consumes `currentUserId` and `postAuthorId` and returns if the current user
    is the post author.

    @property currentUserIsPostAuthor
    @type Boolean
   */
  currentUserIsPostAuthor: Ember.computed('currentUserId', 'postAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('postAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this.set('isEditingBody', false);
    this._prefetchMentions(this.get('post'));
    return this._super(...arguments);
  },

  actions: {

    /**
      Action that stops the editing of the corresponding post.

      @method cancelEditingPostBody
     */
    cancelEditingPostBody() {
      this.set('isEditingBody', false);
    },


    /**
      Action that sets the corresponding post to edit mode.

      @method editPostBody
     */
    editPostBody() {
      this.set('isEditingBody', true);
    },

    /**
      Action that saves the corresponding post, turns off edit mode, and
      refetches the mentions.

      @method savePostBody
     */
    savePostBody() {
      const component = this;
      const post = this.get('post');

      post.save().then((post) => {
        component.set('isEditingBody', false);
        this._fetchMentions(post);
      });
    }
  },

  /**
    Queries the store for body of text with mentions.

    @method _fetchMentions
    @param {Object} post
    @private
   */
  _fetchMentions(post) {
    this.get('mentionFetcher').fetchBodyWithMentions(post, 'post').then((body) => {
      this.set('postBodyWithMentions', body);
    });
  },


  /**
    Parses the body of text and prefetches mentions.

    @method _prefetchMentions
    @param {Object} post
    @private
   */
  _prefetchMentions(post) {
    const body = this.get('mentionFetcher').prefetchBodyWithMentions(post, 'post');

    this.set('postBodyWithMentions', body);
  },
});
