import DS from 'ember-data';
import Owner from 'code-corps-ember/models/owner';
import Ember from 'ember';

export default Owner.extend({
  name: DS.attr('string'),
  username: DS.attr('string'),
  website: DS.attr('string'),
  twitter: DS.attr('string'),
  biography: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  base64PhotoData: DS.attr('string'),
  photoThumbUrl: DS.attr('string'),
  photoLargeUrl: DS.attr('string'),
  createdAt: DS.attr('date'),
  organizations: DS.hasMany('organization', { async: true }),
  atUsername: Ember.computed('username', function() {
    return `@${this.get('username')}`;
  }),
  twitterUrl: Ember.computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  })
});
