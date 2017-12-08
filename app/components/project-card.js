import Component from '@ember/component';
import { mapBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import projectMember from 'code-corps-ember/macros/project-member';

/**
  `project-card` composes a card that contains the given project's description,
  skills, and contributing users.

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

  currentUser: service(),
  session: service(),

  currentProjectMembership: projectMember('project.projectUsers', 'currentUser.user'),

  projectUsers: mapBy('project.projectUsers', 'user')
});
