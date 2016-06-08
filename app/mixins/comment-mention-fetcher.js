import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Mixin.create({
  store: Ember.inject.service(),

  commentBodyPreviewWithMentions: Ember.computed('comment.bodyPreview', 'commentPreviewMentions', function() {
    let comment = this.get('comment');
    let commentPreviewMentions = this.get('commentPreviewMentions');
    if (Ember.isPresent(comment)) {
      return parse(comment.get('bodyPreview'), commentPreviewMentions);
    } else {
      return '';
    }
  }),

  commentBodyWithMentions: Ember.computed('comment.body', 'commentMentions', function() {
    let comment = this.get('comment');
    let commentMentions = this.get('commentMentions');
    if (Ember.isPresent(comment)) {
      return parse(comment.get('body'), commentMentions);
    } else {
      return '';
    }
  }),

  reloadPreviewMentions() {
    let commentId = this.get('comment.id');
    this.get('store').query('commentUserMention', { comment_id: commentId, status: 'preview' }).then((mentions) => {
      this.set('commentPreviewMentions', mentions);
    });
  },

  reloadMentions() {
    let commentId = this.get('comment.id');
    this.get('store').query('commentUserMention', { comment_id: commentId, status: 'published' }).then((mentions) => {
      this.set('commentMentions', mentions);
    });
  },

  actions: {
    fetch(fetchType) {
      if (fetchType === 'preview') {
        this.reloadPreviewMentions();
      } else if (fetchType === 'published') {
        this.reloadMentions();
      }
    },
  },
});
