import Ember from 'ember';

const {
  Component,
  computed
 } = Ember;

/**
 * `categories-list` composes the list of categories
 *
 * ## default usage
 *
 * ```handlebars
 * {{categories-list categories=listOfCategories}}
 * ```
 *
 * @class categories-list
 * @module Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['categories-list'],

  /**
   * An array of properties used to sort the list of categories.
   *
   * @property sortByName
   * @type Array
   */
  sortByName: ['name'],

  /**
   * `sortedCategories` consumes the list of categories and sorts them based on
   * the `sortByName` property.
   *
   * @property sortedCategories
   * @type Array
   */
  sortedCategories: computed.sort('categories', 'sortByName')
});
