import Ember from 'ember';

const { Component } = Ember;

/**
  `project-list` presents a list of projects.

  ## default usage

  ```handlebars
  {{project-list projects=projects}}
  ```

  @class project-list
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['project-list']
});
