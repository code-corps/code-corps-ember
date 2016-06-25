import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['create-comment-form'],
  tagName: 'form',

  session: Ember.inject.service(),

  actions: {
    saveComment() {
      let comment = this.get('comment');
      this.sendAction('saveComment', comment);
    },
  }
});
