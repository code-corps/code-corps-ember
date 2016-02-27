import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['create-comment-form'],
  tagName: 'form',

  commentBodyPreviewWithMentions: Ember.computed('comment.bodyPreview', 'commentPreviewMentions', function() {
    let comment = this.get('comment');
    let commentPreviewMentions = this.get('commentPreviewMentions');
    if (Ember.isPresent(comment)) {
      return parse(comment.get('bodyPreview'), commentPreviewMentions);
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

  actions: {
    saveComment() {
      let comment = this.get('comment');
      comment.set('preview', false);
      this.sendAction('saveComment', comment);
    },

    generatePreview(markdown) {
      let comment = this.get('comment');
      comment.set('markdownPreview', markdown);
      comment.set('preview', true);
      comment.save().then(() => this.reloadPreviewMentions());
    }
  }
});
