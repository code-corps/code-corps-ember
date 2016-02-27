import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  store : Ember.inject.service(),

  tagName: 'form',
  classNames: ['post-new-form'],

  types: [
    {label: "Task",  slug: "task"},
    {label: "Issue", slug: "issue"},
    {label: "Progress", slug: "progress"},
    {label: "Idea", slug: "idea"}
  ],

  postBodyPreviewWithMentions: Ember.computed('post.bodyPreview', 'postPreviewMentions', function() {
    let post = this.get('post');
    let postPreviewMentions = this.get('postPreviewMentions');
    if (Ember.isPresent(post)) {
      return parse(post.get('bodyPreview'), postPreviewMentions);
    } else {
      return '';
    }
  }),

  reloadPreviewMentions() {
    let postId = this.get('post.id');
    this.get('store').query('postUserMention', { post_id: postId, status: 'preview' }).then((mentions) => {
      this.set('postPreviewMentions', mentions);
    });
  },

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
      post.save().then(() => this.reloadPreviewMentions());
    }
  }
});
