import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';

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
  canEdit: alias('currentUserIsTaskAuthor'),

  /**
    Returns the current user's ID.

    @property currentUserId
    @type Number
   */
  currentUserId: alias('currentUser.user.id'),

  /**
    Returns the task author's ID.

    @property taskAuthorId
    @type Number
   */
  taskAuthorId: alias('task.user.id'),

  /**
    Consumes `currentUserId` and `taskAuthorId` and returns if the current user
    is the task author.

    @property currentUserIsTaskAuthor
    @type Boolean
   */
  currentUserIsTaskAuthor: computed('currentUserId', 'taskAuthorId', function() {
    let userId = parseInt(get(this, 'currentUserId'), 10);
    let authorId = parseInt(get(this, 'taskAuthorId'), 10);
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
      set(this, 'isEditing', false);
    },

    /**
      Action that set the `isEditing` property to true and sets the `newTitle`
      property to the current title.

      @method edit
     */
    edit() {
      set(this, 'newTitle', get(this, 'task.title'));
      set(this, 'isEditing', true);
    },

    /**
      Action that sets the `title` property to the `newTitle` and calls save on
      the task. If the task successfully saves, the `isEditing` property is set
      to `false`.

      @method save
     */
    applyEdit() {
      let component = this;
      let task = get(this, 'task');
      let newTitle = get(this, 'newTitle');

      set(task, 'title', newTitle);
      get(this, 'saveTask')(task).then(() => {
        set(component, 'isEditing', false);
      });
    }
  }
});
