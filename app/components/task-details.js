import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';

/**
  The task-details component composes a task object, it's author, info,
  and body.

  ## default usage

  ```handlebars
  {{task-details task=task}}
  ```

  @class task-details
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-details'],

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
    set(this, 'isEditingBody', false);
    this._prefetchMentions(get(this, 'task'));
    return this._super(...arguments);
  },

  actions: {

    /**
      Action that stops the editing of the corresponding task.

      @method cancelEditingTaskBody
     */
    cancelEditingTaskBody() {
      set(this, 'isEditingBody', false);
    },

    /**
      Action that sets the corresponding task to edit mode.

      @method editTaskBody
     */
    editTaskBody() {
      set(this, 'isEditingBody', true);
    },

    /**
      Action that saves the corresponding task, turns off edit mode, and
      refetches the mentions.

      @method saveTaskBody
     */
    applyEditTask() {
      let task = get(this, 'task');

      get(this, 'saveTask')(task).then((task) => {
        set(this, 'isEditingBody', false);
        this._fetchMentions(task);
      });
    }
  },

  /**
    Queries the store for body of text with mentions.

    @method _fetchMentions
    @param {Object} task
    @private
   */
  _fetchMentions(task) {
    get(this, 'mentionFetcher').fetchBodyWithMentions(task, 'task').then((body) => {
      if (body) {
        set(this, 'taskBodyWithMentions', body);
      }
    });
  },

  /**
    Parses the body of text and prefetches mentions.

    @method _prefetchMentions
    @param {Object} task
    @private
   */
  _prefetchMentions(task) {
    let body = get(this, 'mentionFetcher').prefetchBodyWithMentions(task, 'task');
    if (body) {
      set(this, 'taskBodyWithMentions', body);
    }
  }
});
