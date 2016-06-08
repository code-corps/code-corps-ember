import Ember from 'ember';
import PostMentionFetcherMixin from 'code-corps-ember/mixins/post-mention-fetcher';

export default Ember.Component.extend(PostMentionFetcherMixin, {
  classNames: ['post-details'],

  currentUser: Ember.inject.service(),

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
    this.send('fetch', 'published');
    return this._super(...arguments);
  },

  actions: {
    cancelEditingPostBody() {
      this.set('isEditingBody', false);
    },

    editPostBody() {
      this.set('isEditingBody', true);
    },

    generatePreview(markdown) {
      let post = this.get('post');
      post.set('markdownPreview', markdown);
      post.set('preview', true);
      post.save().then(() => this.send('fetch', 'preview'));
    },

    savePostBody() {
      let component = this;
      let post = this.get('post');
      post.set('preview', false);
      post.save().then(() => {
        component.set('isEditingBody', false);
        component.send('fetch', 'published');
      });
    }
  }
});
