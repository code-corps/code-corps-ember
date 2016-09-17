import Ember from 'ember';

/**
  @class post-title
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-title'],
  classNameBindings: ['isEditing:editing'],

  /**
    @property currentUser
    @type Ember.Service
   */
  currentUser: Ember.inject.service(),

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
    this._super(...arguments);
    this.setProperties({
      isEditing: false,
    });
  },

  actions: {
    /**
      Action that sets the `isEditing` property to `false`

      @method cancel
     */
    cancel() {
      this.set('isEditing', false);
    },

    /**
      Action that set the `isEditing` property to true and sets the `newTitle`
      property to the current title.

      @method edit
     */
    edit() {
      this.set('newTitle', this.get('post.title'));
      this.set('isEditing', true);
    },

    /**
      Action that sets the `title` property to the `newTitle` and calls save on
      the post. If the post successfully saves, the `isEditing` property is set
      to `false`.

      @method save
     */
    save() {
      let component = this;
      let post = this.get('post');
      let newTitle = this.get('newTitle');

      post.set('title', newTitle);
      post.save().then(() => {
        component.set('isEditing', false);
      }).catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422 );

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.posts.post').set('error', error);
        }
      });
    },
  },
});
