import Ember from 'ember';

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

export default Ember.Component.extend({
  classNames: ['project-details'],
  classNameBindings: ['expanded'],
  expanded: false,

  /**
    @property store
    @type Ember.service
   */
  store: Ember.inject.service(),

  /**
    @property session
    @type Ember.service
   */
  session: Ember.inject.service(),

  /**
    @property credentials
    @type Ember.service
   */
  credentials: Ember.inject.service(),

  /**
    @property currentUser
    @type Ember.service
   */
  currentUser: Ember.inject.service(),

  actions: {
    /**
      Action that allows a user to join a project.

      @method joinProject
     */
    joinProject() {
      let currentUser = this.get('currentUser.user');

      this.get('project.organization').then((organization) => {
        let membership = this.get('store').createRecord('organization-membership', {
          member: currentUser,
          organization: organization,
          role: 'pending'
        });

        return membership.save();
      });
    }
  }
});
