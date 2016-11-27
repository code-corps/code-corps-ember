import Ember from 'ember';

const {
  A,
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
    An array of contributor roles.

    @property roles
    @type Ember.Array
   */
  roles: A([
    'Developer',
    'Ember Developer',
    'UX Designer',
    'Software Engineer',
    'Project Coordinator',
    'Designer & Developer'
  ]),

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
