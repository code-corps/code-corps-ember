import Component from '@ember/component';
import { mapBy, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import projectMember from 'code-corps-ember/macros/project-member';

/**
  Displays information about the project and allows a user to join the project.

  ## default usage
  ```handlebars
  {{project-header project=project}}
  ```

  @module Component
  @extends Ember.Component
  @class project-header
 */

export default Component.extend({
  classNames: ['project__header'],
  classNameBindings: ['expanded'],
  expanded: false,
  tagName: 'header',

  currentUser: service(),
  session: service(),
  store: service(),
  user: alias('currentUser.user'),

  currentProjectMembership: projectMember('project.projectUsers', 'currentUser.user'),

  projectSkills: mapBy('project.projectSkills', 'skill')
});
