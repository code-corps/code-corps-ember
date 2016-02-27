import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Mixin.create({
  store: Ember.inject.service(),

  postBodyWithMentions: Ember.computed('postMentions', function() {
    let post = this.get('post');
    let postMentions = this.get('postMentions');
    if (Ember.isPresent(post)) {
      return parse(post.get('body'), postMentions);
    } else {
      return '';
    }
  }),

  postBodyPreviewWithMentions: Ember.computed('postPreviewMentions', function() {
    let post = this.get('post');
    let postPreviewMentions = this.get('postPreviewMentions');
    if (Ember.isPresent(post)) {
      return parse(post.get('bodyPreview'), postPreviewMentions);
    } else {
      return '';
    }
  }),

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
    fetch(fetchType) {
      if (fetchType === 'preview') {
        this.reloadPreviewMentions();
      } else if (fetchType === 'published') {
        this.reloadMentions();
      }
    }
  }
});
