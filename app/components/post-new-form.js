import Ember from 'ember';
import PostMentionFetcherMixin from 'code-corps-ember/mixins/post-mention-fetcher';

export default Ember.Component.extend(PostMentionFetcherMixin, {
  tagName: 'form',
  classNames: ['post-new-form'],
  classNameBindings: ['post.postType'],

  types: [
    {label: "Task",  slug: "task"},
    {label: "Issue", slug: "issue"},
    {label: "Progress", slug: "progress"},
    {label: "Idea", slug: "idea"}
  ],

  placeholders: [
    {
      type: "task",
      text: "How can you describe the task so anyone can work on it?"
    },
    {
      type: "issue",
      text: "What issue needs resolved? If it's a bug, how can anyone reproduce it?"
    },
    {
      type: "progress",
      text: "What kind of progress has your team made? Be sure to mention team members who contributed!"
    },
    {
      type: "idea",
      text: "What's your idea?"
    },
  ],

  placeholder: Ember.computed('post.postType', function() {
    let postType = this.get('post.postType');
    if (postType) {
      let item = this.get('placeholders').find((item) => {
        return item.type === postType;
      });
      return item.text;
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
      post.save().then(() => this.send('fetch', 'preview'));
    }
  }
});
