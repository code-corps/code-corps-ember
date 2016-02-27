import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  classNames: ['comment-item'],
  classNameBindings: ['isEditing:editing'],

  store: Ember.inject.service(),
  session: Ember.inject.service(),

  currentUserId: Ember.computed.alias('session.session.authenticated.user_id'),
  commentAuthorId: Ember.computed.alias('comment.user.id'),
  currentUserIsCommentAuthor: Ember.computed('currentUserId', 'commentAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('commentAuthorId'), 10);
    return userId === authorId;
  }),

  canEdit: Ember.computed.and('session.isAuthenticated', 'currentUserIsCommentAuthor'),

  commentBodyWithMentions: Ember.computed('comment.body', 'commentMentions', function() {
    let comment = this.get('comment');
    let commentMentions = this.get('commentMentions');
    if (Ember.isPresent(comment)) {
      return parse(comment.get('body'), commentMentions);
    } else {
      return '';
    }
  }),

  commentBodyPreviewWithMentions: Ember.computed('comment.bodyPreview', 'commentPreviewMentions', function() {
    let comment = this.get('comment');
    let commentPreviewMentions = this.get('commentPreviewMentions');
    if (Ember.isPresent(comment)) {
      return parse(comment.get('bodyPreview'), commentPreviewMentions);
    } else {
      return '';
    }
  }),

  reloadMentions() {
    let commentId = this.get('comment.id');
    this.get('store').query('commentUserMention', { comment_id: commentId, status: 'published' }).then((mentions) => {
      this.set('commentMentions', mentions);
    });
  },

  reloadPreviewMentions() {
    let commentId = this.get('comment.id');
    this.get('store').query('commentUserMention', { comment_id: commentId, status: 'preview' }).then((mentions) => {
      this.set('commentPreviewMentions', mentions);
    });
  },

  init() {
    this.set('isEditing', false);
    this.reloadMentions();
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
        component.reloadMentions();
      });
    },

    generatePreview(markdown) {
      let comment = this.get('comment');
      comment.set('markdownPreview', markdown);
      comment.set('preview', true);
      comment.save().then(() => this.reloadPreviewMentions());
    }
  }
});
