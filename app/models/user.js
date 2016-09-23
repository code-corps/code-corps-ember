import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  base64PhotoData: attr(),
  biography: attr(),
  insertedAt: attr('date'),
  email: attr(),
  firstName: attr(),
  lastName: attr(),
  name: attr(),
  password: attr(),
  photoLargeUrl: attr(),
  photoThumbUrl: attr(),
  state: attr(),
  twitter: attr(),
  username: attr(),
  website: attr(),

  stateTransition: attr(),

  organizationMemberships: hasMany('organization-membership', { async: true }),
  userCategories: hasMany('user-category', { async: true }),
  userRoles: hasMany('user-role', { async: true }),
  userSkills: hasMany('user-skill', { async: true }),

  atUsername: Ember.computed('username', function() {
    return `@${this.get('username')}`;
  }),

  twitterUrl: Ember.computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  }),
});
