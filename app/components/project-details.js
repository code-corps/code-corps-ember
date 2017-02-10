import Ember from 'ember';

const {
  Component,
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
      let organization = this.get('project.organization');
      this.get('credentials').joinOrganization(organization);
    }
  }
});
