import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['comment-item', 'timeline-comment-wrapper'],
  classNameBindings: ['isEditing:editing'],

  currentUser: Ember.inject.service(),
  mentionFetcher: Ember.inject.service(),

  canEdit: Ember.computed.alias('currentUserIsCommentAuthor'),
  commentAuthorId: Ember.computed.alias('comment.user.id'),
  currentUserId: Ember.computed.alias('currentUser.user.id'),
  currentUserIsCommentAuthor: Ember.computed('currentUserId', 'commentAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('commentAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this.set('isEditing', false);
    this._fetchMentions(this.get('comment'));
    return this._super(...arguments);
  },

  actions: {
    cancel() {
      this.set('isEditing', false);
    },

    edit() {
      this.set('isEditing', true);
    },

    save() {
      let component = this;
      let comment = this.get('comment');
      comment.save().then((comment) => {
        component.set('isEditing', false);
        this._fetchMentions(comment);
      });
    },
  },

  _fetchMentions(comment) {
    this.get('mentionFetcher').fetchBodyWithMentions(comment, 'comment').then((body) => {
      this.set('commentBodyWithMentions', body);
    });
  }
});
