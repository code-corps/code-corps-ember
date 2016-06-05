import Owner from 'code-corps-ember/models/owner';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Owner.extend({
  name: attr(),
  username: attr(),
  website: attr(),
  twitter: attr(),
  biography: attr(),
  email: attr(),
  password: attr(),
  photoThumbUrl: attr(),
  photoLargeUrl: attr(),
  createdAt: attr('date'),
  base64PhotoData: attr(),
  state: attr(),
  stateTransition: attr(),

  categories: hasMany('category', { async: true }),
  organizations: hasMany('organization', { async: true }),
  userCategories: hasMany('user-category', { async: true }),

  atUsername: Ember.computed('username', function() {
    return `@${this.get('username')}`;
  }),
  twitterUrl: Ember.computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  }),
});
