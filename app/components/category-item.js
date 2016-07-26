import Ember from 'ember';
import { notEmpty } from 'ember-computed';

const {
  Component,
  computed,
  get,
  inject,
  set,
} = Ember;

const { service } = inject;


/**
 * `category-item` composes a category's icon, and description.
 *
 * ## default usage
 *
 * ```handlebars
 * {{category-item category=category}}
 * ```
 *
 * @class category-item
 * @module Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['category-item'],
  classNameBindings: ['selected'],
  isLoading: false,

  /**
   * @property flashMessages
   * @type Ember.Service
   */
  flashMessages: service(),

  /**
   * @property userCategories
   * @type Ember.Service
   */
  userCategories: service(),

  /**
   * Returns if the category has been selected by the user.
   *
   * @property selected
   * @type Boolean
   */
  selected: notEmpty('userCategory'),

  /**
   * Fetches the category using the `userCategories` service.
   *
   * @property userCategory
   * @type {Object} category
   */
  userCategory: computed('category', 'userCategories.userCategories', function() {
    let category = get(this, 'category');
    let userCategories = get(this, 'userCategories');

    return userCategories.findUserCategory(category);
  }),

  actions: {

    /**
     * Action that sets the `isLoading` property to `true` and saves the
     * category to the user's categories. If there is an error saving the
     * category, a flash message is displayed. The `isLoading` property is
     * reset after the save passes/fails.
     *
     * @method addCategory
     * @param {Object} category
     */
    addCategory(category) {
      set(this, 'isLoading', true);
      let userCategories = get(this, 'userCategories');

      return userCategories.addCategory(category).catch(() => {
        let message = `An error occurred trying to add ${category.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        set(this, 'isLoading', false);
      });
    },

    /**
     * Action that sets the `isLoading` property to `true` and removes the
     * category from the user's categories. If there is an error removing the
     * category, a flash message is displayed. The `isLoading` property is reset
     * after the removal passes/fails
     *
     * @method removeCategory
     * @param {Object} category
     */
    removeCategory(category) {
      set(this, 'isLoading', true);
      let userCategories = get(this, 'userCategories');

      return userCategories.removeCategory(category).catch(() => {
        let message = `An error occurred trying to remove ${category.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        set(this, 'isLoading', false);
      });
    },
  },

  /**
   * Displays a flash message with the given message.
   *
   * @method flashError
   * @param {String} message
   * @private
   */
  _flashError(message) {
    let flashMessages = get(this, 'flashMessages');
    flashMessages.clearMessages();
    return flashMessages.add({
      message: message,
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000,
    });
  },
});
