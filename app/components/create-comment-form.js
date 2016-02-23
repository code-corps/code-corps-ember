import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  classNames: ['create-comment-form'],
  tagName: 'form',

  commentBodyPreviewWithMentions: Ember.computed('comment.bodyPreview', function() {
    let comment = this.get('comment');
    if (Ember.isPresent(comment)) {
      return parse(this.get('comment.bodyPreview'), this.get('comment.commentUserMentions'));
    } else {
      return "";
    }
  }),

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
      comment.save();
    }
  }
});
