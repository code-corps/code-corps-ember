import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

const {
  Component,
  computed,
  get,
  inject: { service },
  isEqual,
  set
} = Ember;

/**
  `comment-item` composes a comment

  ```handlebars
  {{comment-item comment=comment saveError=onSaveError}}
  ```

  @class comment-item
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['comment-item', 'timeline-comment-wrapper'],
  classNameBindings: ['isEditing:editing'],

  /**
   * canEdit - Computed property
   *
   * @property canEdit
   * @return {Boolean}  True if current user is the comment author
   */
  canEdit: computed('currentUser.user.id', 'comment.user.id', function() {
    let userId = parseInt(get(this, 'currentUser.user.id'), 10);
    let authorId = parseInt(get(this, 'comment.user.id'), 10);

    return isEqual(userId, authorId);
  }),

  /**
   * Injection of /services/current-user
   *
   * Used to determine if the current user is the comment author,
   * for edit permissions.
   *
   * @property session
   * @type Ember.Service
   */
  currentUser: service(),

  /**
   * processedBody - Computed property
   *
   * Parses the provided body and "linkifies" the username mentions within it
   * using information provided in the mentions collection
   *
   * We are expected to assign mentions in the template
   *
   * NOTE: This feature is currently disabled, so the unmodified body is returned
   *
   * @property processedComment
   @ @type String
   */
  processedBody: computed('comment.body', 'mentions', function() {
    let body = get(this, 'comment.body');
    let mentions = get(this, 'mentions');
    return parse(body, mentions || []);
  }),

  /**
   * didReceiveAttrs - Component lifecycle hook
   *
   * Used to initially set the component into view mode.
   */
  didReceiveAttrs() {
    set(this, 'isEditing', false);
  },

  actions: {
    /**
     * cancel - Action
     *
     * Triggered when user clicks the cancel button in edit mode.
     * Rolls back comment record and enters view mode.
     */
    cancel() {
      let comment = get(this, 'comment');
      comment.rollbackAttributes();
      set(this, 'isEditing', false);
    },

    /**
     * edit - Action
     *
     * Triggered when the user clicks the edit link in view mode.
     * Enters edit mode.
     */
    edit() {
      set(this, 'isEditing', true);
    },

    /**
     * save - Action
     *
     * Triggered when user clicks the save button in edit mode.
     * Save changes to comment.
     * On success, enters view mode.
     * On failure, sends `saveError` action with the failure payload.
     */
    save() {
      let comment = get(this, 'comment');
      comment.save().then(() => set(this, 'isEditing', false))
                    .catch((payload) => this.sendAction('saveError', payload));
    }
  }
});
