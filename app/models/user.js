import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  admin: attr(),
  biography: attr(),
  cloudinaryPublicId: attr(),
  email: attr(),
  firstName: attr(),
  githubAvatarUrl: attr(),
  githubId: attr(),
  githubUsername: attr(),
  insertedAt: attr('date'),
  intercomUserHash: attr(),
  lastName: attr(),
  name: attr(),
  password: attr(),
  photoLargeUrl: attr(),
  photoThumbUrl: attr(),
  signUpContext: attr(),
  state: attr(),
  twitter: attr(),
  username: attr(),
  website: attr(),

  stateTransition: attr(),

  categories: hasMany('category', { async: true }),
  githubAppInstallations: hasMany('github-app-installation', { async: true }),
  organizations: hasMany('organization', { async: true }),
  projectUsers: hasMany('project-user', { async: true }),
  stripeConnectSubscriptions: hasMany('stripe-connect-subscription', { async: true }),
  stripePlatformCard: belongsTo('stripe-platform-card', { async: true }),
  stripePlatformCustomer: belongsTo('stripe-platform-customer', { async: true }),
  userCategories: hasMany('user-category', { async: true }),
  userRoles: hasMany('user-role', { async: true }),
  userSkills: hasMany('user-skill', { async: true }),

  atUsername: computed('username', function() {
    return `@${this.get('username')}`;
  }),

  twitterUrl: computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  })
});
