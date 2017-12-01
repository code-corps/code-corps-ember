import Component from '@ember/component';
import { mapBy, alias } from '@ember/object/computed';
import { getProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import projectMember from 'code-corps-ember/macros/project-member';

/**
  Displays information about the project and allows a user to join the project

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

  /**
   * @property store
   * @type Ember.Service
   */
  store: service(),

  /**
    @property session
    @type Ember.Service
   */
  session: service(),

  /**
    @property currentUser
    @type Ember.Service
   */
  currentUser: service(),

  /**
   * @property user
   * @type DS.Model
   */
  user: alias('currentUser.user'),

  currentProjectMembership: projectMember('project.projectUsers', 'currentUser.user'),

  projectSkills: mapBy('project.projectSkills', 'skill'),

  actions: {
    // TODO: This should go outside the component, but with the way the
    // project, project.index, project.settings and project.tasks templates are
    // set up, it's difficult to move this into a route/controller action
    joinProject(project) {
      let { store, user } = getProperties(this, 'store', 'user');
      return store.createRecord('project-user', { user, project, role: 'pending' })
        .save();
    }
  }
});
