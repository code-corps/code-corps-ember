import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['create-comment-form'],
  tagName: 'form',

  actions: {
    saveComment(comment) {
      this.sendAction('saveComment', comment);
    }
  }
});
