import Ember from 'ember';

const {
  Component,
  computed,
  computed: { mapBy },
  get,
  inject: { service }
} = Ember;

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

  // TODO: Similar code is defined in
  // - `abilities/project.js`
  // - `abilities/task.js`
  currentProjectMembership: computed('project.projectUsers', 'currentUser.user.id', function() {
    let projectUsers = get(this, 'project.projectUsers');
    let currentUserId = get(this, 'currentUser.user.id');

    return projectUsers.find((item) => {
      return get(item, 'user.id') === currentUserId;
    });
  }),

  projectCategories: mapBy('project.projectCategories', 'category'),
  projectSkills: mapBy('project.projectSkills', 'skill'),
  projectUsers: mapBy('project.projectUsers', 'user')
});
