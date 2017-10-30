import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { isPresent } from '@ember/utils';

/**
  The `volunteer-headshot` component presents a thumbnail of a volunteer, their
  name and randomly selects one of their roles.

  ## Default Usage

  ```handlebars
  {{volunteer-headshot volunteer=user}}
  ```

  @class volunteer-headshot
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['volunteer-headshot'],

  /**
    A computed alias of the volunteer's user roles.

    @property userRoles
    @type Ember.Array
   */
  userRoles: alias('volunteer.userRoles'),

  /**
    A randomly selected role from the `userRoles` property.

    @property userRole
    @type Ember.Model
   */
  userRole: computed('userRoles', function() {
    let userRoles = get(this, 'userRoles');

    if (isPresent(userRoles)) {
      let randomIndex = Math.floor(Math.random() * get(userRoles, 'length'));

      return userRoles.objectAt(randomIndex);
    }
  }),

  /**
   * Returns the volunteer's name. If the `name` property is not defined,
   * it returns the volunteer's username.
   *
   * @property volunteerName
   * @type String
   */
  volunteerName: computed('volunteer.{name,username}', function() {
    let name = get(this, 'volunteer.name');
    let username = get(this, 'volunteer.username');

    if (isPresent(name)) {
      return name;
    } else {
      return username;
    }
  })
});
