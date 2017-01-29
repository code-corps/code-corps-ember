import Ember from 'ember';

const {
  Component,
  get,
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
  classNames: ['project-details'],
  classNameBindings: ['expanded'],
  expanded: false,

  /**
    @property store
    @type Ember.service
   */
  store: service(),

  /**
    @property session
    @type Ember.service
   */
  session: service(),

  /**
    @property credentials
    @type Ember.service
   */
  credentials: service(),

  /**
    @property currentUser
    @type Ember.service
   */
  currentUser: service(),

  actions: {
    /**
      Action that allows a user to join a project.

      @method joinProject
     */
    joinProject() {
      let organization = get(this, 'project.organization');
      get(this, 'credentials').joinOrganization(organization);
    }
  }
});
