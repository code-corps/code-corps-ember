import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  tagName: 'form',

  classNames: ['post-new-form'],

  types: [
    {label: "Task",  slug: "task"},
    {label: "Issue", slug: "issue"},
    {label: "Progress", slug: "progress"},
    {label: "Idea", slug: "idea"}
  ],

  postBodyPreviewWithMentions: Ember.computed('post.bodyPreview', function() {
    let post = this.get('post');
    if (Ember.isPresent(post)) {
      return parse(this.get('post.bodyPreview'), this.get('post.postUserMentions'));
    } else {
      return "";
    }
  }),

  actions: {
    submit() {
      let post = this.get('post');
      post.set('preview', false);
      this.sendAction('savePost', post);
    },

    generatePreview(markdown) {
      let post = this.get('post');
      post.set('markdownPreview', markdown);
      post.set('preview', true);
      post.save();
    }
  }
});
