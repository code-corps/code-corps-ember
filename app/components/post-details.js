import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-details'],

  currentUser: Ember.inject.service(),
  mentionFetcher: Ember.inject.service(),

  canEdit: Ember.computed.alias('currentUserIsPostAuthor'),
  currentUserId: Ember.computed.alias('currentUser.user.id'),
  postAuthorId: Ember.computed.alias('post.user.id'),

  currentUserIsPostAuthor: Ember.computed('currentUserId', 'postAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('postAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this.set('isEditingBody', false);
    this._fetchMentions(this.get('post'));
    return this._super(...arguments);
  },

  actions: {
    cancelEditingPostBody() {
      this.set('isEditingBody', false);
    },

    editPostBody() {
      this.set('isEditingBody', true);
    },

    savePostBody() {
      let component = this;
      let post = this.get('post');
      post.save().then((post) => {
        component.set('isEditingBody', false);
        this._fetchMentions(post);
      });
    }
  },

  _fetchMentions(post) {
    this.get('mentionFetcher').fetchBodyWithMentions(post, 'post').then((body) => {
      this.set('postBodyWithMentions', body);
    });
  }
});
