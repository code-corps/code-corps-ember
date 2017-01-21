import Ember from 'ember';

const { Component } = Ember;

/**
  `project-item` presents a project with the icon, title and description. Each
  `project-item` links to the corresponding project.

  ## default usage

  ```handlebars
  {{project-item project=project}}
  ```

  @class project-item
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['project-item']
});
