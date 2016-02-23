import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  classNames: ['comment-item'],
  classNameBindings: ['isEditing:editing'],

  session: Ember.inject.service(),

  currentUserId: Ember.computed.alias('session.session.authenticated.user_id'),
  commentAuthorId: Ember.computed.alias('comment.user.id'),
  currentUserIsCommentAuthor: Ember.computed('currentUserId', 'commentAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('commentAuthorId'), 10);
    return userId === authorId;
  }),

  canEdit: Ember.computed.and('session.isAuthenticated', 'currentUserIsCommentAuthor'),

  commentBodyWithMentions: Ember.computed('comment.body', function() {
    let comment = this.get('comment');
    if (Ember.isPresent(comment)) {
      return parse(this.get('comment.body'), this.get('comment.commentUserMentions'));
    } else {
      return "";
    }
  }),

  commentBodyPreviewWithMentions: Ember.computed('comment.bodyPreview', function() {
    let comment = this.get('comment');
    if (Ember.isPresent(comment)) {
      return parse(this.get('comment.bodyPreview'), this.get('comment.commentUserMentions'));
    } else {
      return "";
    }
  }),

  init() {
    this.set('isEditing', false);
    return this._super(...arguments);
  },

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    cancel() {
      this.set('isEditing', false);
    },

    save() {
      let component = this;
      let comment = this.get('comment');
      comment.set('preview', false);
      comment.save().then(() => {
        component.set('isEditing', false);
      });
    },

    generatePreview(markdown) {
      let comment = this.get('comment');
      comment.set('markdownPreview', markdown);
      comment.set('preview', true);
      comment.save();
    }
  }
});
