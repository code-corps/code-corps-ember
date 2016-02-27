import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  classNames: ['post-details'],

  postBodyWithMentions: Ember.computed('post.body', 'postMentions', function() {
    let post = this.get('post');
    let postMentions = this.get('postMentions');
    if (Ember.isPresent(post)) {
      return parse(post.get('body'), postMentions);
    } else {
      return '';
    }
  }),

  postBodyPreviewWithMentions: Ember.computed('post.bodyPreview', 'postPreviewMentions', function() {
    let post = this.get('post');
    let postPreviewMentions = this.get('postPreviewMentions');
    if (Ember.isPresent(post)) {
      return parse(post.get('bodyPreview'), postPreviewMentions);
    } else {
      return '';
    }
  }),

  init() {
    this.set('isEditingBody', false);
    this.set('isEditingTitle', false);
    this.reloadMentions();
    return this._super(...arguments);
  },

  reloadMentions() {
    let postId = this.get('post.id');
    this.get('store').query('postUserMention', { post_id: postId, status: 'published' }).then((mentions) => {
      this.set('postMentions', mentions);
    });
  },

  reloadPreviewMentions() {
    let postId = this.get('post.id');
    this.get('store').query('postUserMention', { post_id: postId, status: 'preview' }).then((mentions) => {
      this.set('postPreviewMentions', mentions);
    });
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
      post.save().then(() => this.reloadPreviewMentions());
    },

    savePostBody() {
      let component = this;
      let post = this.get('post');
      post.set('preview', false);
      post.save().then(() => {
        component.set('isEditingBody', false);
        component.reloadMentions();
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
