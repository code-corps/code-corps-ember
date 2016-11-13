import Ember from 'ember';

const {
  Component,
  computed: { mapBy }
} = Ember;

/**
  `project-card` composes a card that contains the given project's description,
  skills, and contributing members.

  ## default usage

  ```Handlebars
  {{project-card project=project}}
  ```

  @class project-card
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['project-card'],

  projectCategories: mapBy('project.projectCategories', 'category'),
  projectOrganizationMembers: mapBy('project.organization.organizationMemberships', 'member'),
  projectSkills: mapBy('project.projectSkills', 'skill')
});
