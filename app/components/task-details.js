import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  inject: { service }
} = Ember;

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
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('taskAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this.set('isEditingBody', false);
    this._prefetchMentions(this.get('task'));
    return this._super(...arguments);
  },

  actions: {

    /**
      Action that stops the editing of the corresponding task.

      @method cancelEditingTaskBody
     */
    cancelEditingTaskBody() {
      this.set('isEditingBody', false);
    },

    /**
      Action that sets the corresponding task to edit mode.

      @method editTaskBody
     */
    editTaskBody() {
      this.set('isEditingBody', true);
    },

    /**
      Action that saves the corresponding task, turns off edit mode, and
      refetches the mentions.

      @method saveTaskBody
     */
    saveTaskBody() {
      let component = this;
      let task = this.get('task');

      task.save().then((task) => {
        component.set('isEditingBody', false);
        this._fetchMentions(task);
      }).catch((error) => {
        let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

        if (!payloadContainsValidationErrors) {
          this.controllerFor('project.tasks.task').set('error', error);
        }
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
    this.get('mentionFetcher').fetchBodyWithMentions(task, 'task').then((body) => {
      this.set('taskBodyWithMentions', body);
    });
  },

  /**
    Parses the body of text and prefetches mentions.

    @method _prefetchMentions
    @param {Object} task
    @private
   */
  _prefetchMentions(task) {
    let body = this.get('mentionFetcher').prefetchBodyWithMentions(task, 'task');

    this.set('taskBodyWithMentions', body);
  }
});
