import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service }
} = Ember;

/**
  @class task-title
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-title'],
  classNameBindings: ['isEditing:editing'],

  /**
    @property currentUser
    @type Ember.Service
   */
  currentUser: service(),

  /**
    Returns whether or not the current user can edit the current task.

    @property canEdit
    @type Boolean
   */
  canEdit: computed.alias('currentUserIsTaskAuthor'),

  /**
    Returns the current user's ID.

    @property currentUserId
    @type Number
   */
  currentUserId: computed.alias('currentUser.user.id'),

  /**
    Returns the task author's ID.

    @property taskAuthorId
    @type Number
   */
  taskAuthorId: computed.alias('task.user.id'),

  /**
    Consumes `currentUserId` and `taskAuthorId` and returns if the current user
    is the task author.

    @property currentUserIsTaskAuthor
    @type Boolean
   */
  currentUserIsTaskAuthor: computed('currentUserId', 'taskAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('taskAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this._super(...arguments);
    this.setProperties({
      isEditing: false
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
      this.set('newTitle', this.get('task.title'));
      this.set('isEditing', true);
    },

    /**
      Action that sets the `title` property to the `newTitle` and calls save on
      the task. If the task successfully saves, the `isEditing` property is set
      to `false`.

      @method save
     */
    applyEdit() {
      let component = this;
      let task = this.get('task');
      let newTitle = this.get('newTitle');

      task.set('title', newTitle);
      this.get('saveTask')(task).then(() => {
        component.set('isEditing', false);
      });
    }
  }
});
