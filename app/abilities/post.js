import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  credentials: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  post: Ember.computed.alias('model'),

  userIsAuthor: Ember.computed('post', 'currentUser.user', function() {
    let postUserId = this.get('post.user.id');
    let currentUserId = this.get('currentUser.user.id');

    return postUserId === currentUserId;
  }),

  membership: Ember.computed.alias('credentials.currentUserMembership'),
  userIsAtLeastAdmin: Ember.computed.or('membership.isAdmin', 'membership.isOwner'),

  canEdit: Ember.computed.or('userIsAuthor', 'userIsAtLeastAdmin')
});
