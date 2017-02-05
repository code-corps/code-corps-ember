import Ember from 'ember';

const {
  Component
} = Ember;

/**
  This component is used as a container for a list of skills.

  ## default usage

  ```Handlebars
  {{skills-list skills=projectSkills}}
  ```

  @class skills-list
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['skills-list']
});
