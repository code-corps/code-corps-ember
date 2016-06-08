import Ember from 'ember';
import CommentMentionFetcherMixin from 'code-corps-ember/mixins/comment-mention-fetcher';

export default Ember.Component.extend(CommentMentionFetcherMixin, {
  classNames: ['create-comment-form'],
  tagName: 'form',

  session: Ember.inject.service(),

  actions: {
    generatePreview(markdown) {
      let comment = this.get('comment');
      comment.set('markdownPreview', markdown);
      comment.set('preview', true);
      comment.save().then(() => this.send('fetch', 'preview'));
    },

    saveComment() {
      let comment = this.get('comment');
      comment.set('preview', false);
      this.sendAction('saveComment', comment);
    },
  }
});
