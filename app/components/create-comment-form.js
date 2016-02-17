import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['create-comment-form'],
  tagName: 'form',

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
