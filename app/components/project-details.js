import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, mapBy },
  get,
  getProperties,
  inject: { service }
} = Ember;

/**
  Displays information about the project and allows a user to join the project

  ## default usage
  ```handlebars
  {{project-details project=project}}
  ```

  @module Component
  @extends Ember.Component
  @class project-details
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
