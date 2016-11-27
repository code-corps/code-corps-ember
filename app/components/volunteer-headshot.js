import Ember from 'ember';

const {
  Component,
  computed,
  get,
  isPresent
} = Ember;

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
  attributeBindings: ['data-test-selector'],
  classNames: ['volunteer-headshot'],

  /**
    A computed alias of the volunteer's user roles.

    @property userRoles
    @type Ember.Array
   */
  userRoles: computed.alias('volunteer.userRoles'),

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
    Returns the volunteer's name. If the `name` property is not defined, it
    computes a name from the volunteer's `firstName` & `lastName`. If neither
    are defined it returns the volunteer's username.

    @property volunteerName
    @type String
   */
  volunteerName: computed('volunteer.{name,firstName,lastName}', function() {
    let name = get(this, 'volunteer.name');
    let firstName = get(this, 'volunteer.firstName');
    let lastName = get(this, 'volunteer.lastName');
    let userName = get(this, 'volunteer.userName');

    if (isPresent(name)) {
      return name;
    } else if (isPresent(firstName) && isPresent(lastName)) {
      return `${firstName} ${lastName}`;
    } else {
      return userName;
    }
  })
});
