import Component from '@ember/component';
import { sort } from '@ember/object/computed';

/**
  `project-categories-list` displays a list of categories within the project,
  sorted by name.

  ## default usage

  ```handlebars
  {{project-categories-list categories=project.categories}}
  ```

  @class project-categories-list
  @module Component
  @extends Ember.Component
 */

export default Component.extend({
  classNames: ['categories'],
  sortByName: ['name'],
  tagName: 'ul',

  /**
    Returns the categories sorted by name.

    @property sortedCategories
    @type Ember.Array
   */
  sortedCategories: sort('categories', 'sortByName')
});
