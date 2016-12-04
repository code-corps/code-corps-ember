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
    A computed array of the volunteer's user roles.

    @property userRoles
    @type Ember.Array
   */
  userRoles: computed('volunteer.userRoles.[]',
      'volunteer.userRoles.@each.role',
      'volunteer.userRoles.@each.user',
    function() {
      return this.get('volunteer.userRoles');
    }),

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
    are defined it returns an empty string.

    @property volunteerName
    @type String
   */
  volunteerName: computed('volunteer.name', 'volunteer.firstName', 'volunteer.lastName', function() {
    let name = get(this, 'volunteer.name');
    let firstName = get(this, 'volunteer.firstName');
    let lastName = get(this, 'volunteer.lastName');

    if (isPresent(name)) {
      return name;
    } else if (isPresent(firstName) && isPresent(lastName)) {
      return `${firstName} ${lastName}`;
    } else {
      return '';
    }
  }),

  /**
    Returns if the computed property `volunteerName` is present.

    @property isVolunteerNamePresent
    @type Boolean
   */
  isVolunteerNamePresent: computed.notEmpty('volunteerName'),

  /**
    A computed string for the volunteer's image headshot alt text.

    @property altText
    @type String
   */
  altText: computed('volunteerName', function() {
    let name = get(this, 'volunteerName');

    return `${name}\'s headshot`;
  })
});
