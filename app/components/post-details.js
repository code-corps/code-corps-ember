import Ember from 'ember';
import PostMentionFetcherMixin from 'code-corps-ember/mixins/post-mention-fetcher';

export default Ember.Component.extend(PostMentionFetcherMixin, {
  classNames: ['post-details'],
  classNameBindings: ['post.postType'],

  session: Ember.inject.service(),

  init() {
    this.set('isEditingBody', false);
    this.set('isEditingTitle', false);
    this.send('fetch', 'published');
    return this._super(...arguments);
  },

  actions: {
    editPostBody() {
      this.set('isEditingBody', true);
    },

    cancelEditingPostBody() {
      this.set('isEditingBody', false);
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
    },

    savePostTitle(title) {
      let component = this;
      let post = this.get('post');
      post.set('title', title);
      post.save().then(() => {
        component.set('isEditingTitle', false);
      });
    }
  }
});
