import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',

  classNames: ['post-new-form'],

  types: [
    {label: "Task",  slug: "task"},
    {label: "Issue", slug: "issue"},
    {label: "Progress", slug: "progress"},
    {label: "Idea", slug: "idea"}
  ],

  actions: {
    submit() {
      let post = this.get('post');
      this.sendAction('savePost', post);
    }
  }
});