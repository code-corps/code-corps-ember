import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-new-form'],
  classNameBindings: ['post.postType'],
  tagName: 'form',

  credentials: Ember.inject.service(),

  placeholders: {
    task: "How can you describe the steps to complete the task so anyone can work on it?",
    issue: "What issue needs resolved? If it's a bug, how can anyone reproduce it?",
    idea: "What's your idea? Be specific so people can give more accurate feedback.",
  },

  placeholder: Ember.computed('post.postType', function() {
    let postType = this.get('post.postType');
    if (postType) {
      return this.get(`placeholders.$(postType)`);
    }
  }),

  actions: {
    submit() {
      let post = this.get('post');
      this.sendAction('savePost', post);
    },
  },
});
