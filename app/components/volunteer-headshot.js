import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

/**
  The `volunteer-headshot` component presents a thumbnail of a volunteer, their
  name and a randomly selected role.

  ```handlebars
  {{volunteer-headshot volunteer=user}}
  ```

  @class volunteer-headshot
  @module Component
  @extends Ember.Component
 */
export default Component.extend({

  /**
    A computed array of the volunteer's role names.

    @property roles
    @type Ember.Array
   */
  roles: computed('volunteer.userRoles.@each.role', function() {
    let userRoles = get(this, 'volunteer.userRoles');
    let roleNames = userRoles.map((userRole) => {
      return userRole.role.name;
    });

    return roleNames;
  }),

  /**
    A randomly selected role from the `roles` property.

    @property role
    @type String
   */
  role: computed('roles', function() {
    let roles = get(this, 'roles');
    let randomIndex = Math.floor(Math.random() * roles.length);

    return roles[randomIndex];
  }),

  /**
    A computed string for the volunteer's image headshot alt text.

    @property altText
    @type String
   */
  altText: computed('volunteer.name', function() {
    let name = get(this, 'volunteer.name');

    return `${name}\'s headshot`;
  })
});
