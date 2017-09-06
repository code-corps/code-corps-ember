import Ember from 'ember';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

const {
  computed: { alias, filterBy },
  Controller,
  get,
  getProperties,
  inject: { service },
  set
} = Ember;

export default Controller.extend({

  /**
   * The injected store service
   * @property store
   * @type Ember.Service
   */
  store: service(),

  /**
   * The injected taskSkillsList service
   * Used to toggle task Skills
   *
   * @property taskSkillsList
   * @type Ember.Service
   */
  taskSkillsList: service(),

  /**
   * The injected services/current-user service
   * @property currentUser
   * @type Ember.Service
   */
  currentUser: service(),

  /**
   * List of comments to be rendered as replies to the loaded task.
   * Since an unsaved comment is initialized by default, and bound to the
   * `create-comment-form` component, we do not want to render that one, so we
   * filter the task commentys to only show the persised ones.
   *
   * @property comments
   * @type DS.ManyArray
   */
  comments: filterBy('task.comments', 'isNew', false),

  /**
   * Shorthad for a list of the current task's assigned skills
   *
   * @property taskSkills
   * @type DS.ManyArray
   */
  taskSkills: alias('task.taskSkills'),

  /**
   * Alias to the user property of the current user
   *
   * @property user
   * @type DS.Model
   */
  user: alias('currentUser.user'),

  actions: {
    /**
     * saveTask - Triggers when the user saves the current task after editing.
     * On error, calls error handler.
     * @param  {DS.Model} task The task to be saved
     */
    saveTask(task) {
      return task.save()
        .catch((payload) => this._onError(payload));
    },

    /**
     * saveComment - Triggered when user saves a new comment.
     * Saves comment, then creates a new unsaved one.
     * On error, calls error handler.
     *
     * @param  {String} markdown The edited markdown content to update the comment with.
     */
    saveComment(markdown) {
      let comment = get(this, 'newComment');
      set(comment, 'markdown', markdown);
      return comment.save()
        .then((comment) => this._initComment(comment))
        .catch((payload) => this._onError(payload));
    },

    /**
     * onSaveError - Triggers when an edited comment had an error during save.
     * Calls error handler.
     *
     * @param  {Object} payload The payload of the error.
     */
    onSaveError(payload) {
      this._onError(payload);
    },

    /**
     * removeTaskSkill - Triggers when a user clicks an assigned task skill's
     * button. Destroys the taskSkill record, removing the skill from the task's
     * list of skills.
     *
     * @param {DS.Model} taskSkill - The taskSkill record to destroy
     */
    removeTaskSkill(taskSkill) {
      return taskSkill.destroyRecord();
    },

    /**
     * toggleSkill - Triggers when a user clicks or submits a skill in the skill
     * dropdown. Uses the `taskSkillList` service to create or destroy the
     * `taskSkill` record associated to the currently loaded `task` and the
     * provided `skill`
     *
     * @param {DS.Model} skill - The skill to create or destroy a `taskSkill` for
     */
    toggleSkill(skill) {
      let list = get(this, 'taskSkillsList');
      return list.toggle(skill);
    }
  },

  /**
   * _onError - Checks if the payload is a validation error payload.
   * If that is the case, it does nothing, since validation errors ought to be
   * displayed as part of the form for that record.
   * If that is not the case, it sets the controller `error` property, to be rendered
   * using the `error-formatter` component.
   *
   * @private
   * @param  {Object} payload The error payload to handle.
   */
  _onError(payload) {
    if (isNonValidationError(payload)) {
      set(this, 'error', payload);
    }
  },

  /**
   * _initComment - Creates a new unsaved comment record, assigned to the currently
   * singed in user and the currently loaded model record.
   * Assings it to the controller's `newComment` property, so it can be bound to the
   * `create-comment-form` component
   */
  _initComment() {
    let { store, task, user } = getProperties(this, 'store', 'task', 'user');
    let newComment = store.createRecord('comment', { task, user });

    set(this, 'newComment', newComment);
  }
});
