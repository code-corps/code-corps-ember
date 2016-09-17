import Ember from 'ember';

/**
  `project-category-item` represents a category with a project. When selected
  the user is taken to a list of projects using this category.

  ## Default usage
  ```Handlebars
    {{project-category-item category=category}}
  ```

  @class project-category-item
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: ['li'],

  /**
    Returns true if 'userCategory' is not empty

    @property selected
    @type Boolean
   */
  selected: Ember.computed.notEmpty('userCategory'),

  /**
    A service that returns all userCategories.

    @property userCategories
    @type Ember.Service
   */
  userCategories: Ember.inject.service(),

  /**
    The current user.

    @property user
    @type DS.Model
   */
  user: Ember.computed.alias('currentUser.user'),

  /**
    Categories that the user belongs to.

    @property usersUserCategories
    @type Ember.Array
   */
  usersUserCategories: Ember.computed.alias('user.userCategories'),

  /**
    Returns the category if it exists in the user's categories.

    @property userCategory
    @type Ember.Object
   */
  userCategory: Ember.computed('category', 'userCategories.userCategories.isFulfilled', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.findUserCategory(category);
  }),
});
