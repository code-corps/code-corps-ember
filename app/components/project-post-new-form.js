import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-post-new-form'],

  types: [
    {label: "Task",  slug: "task"},
    {label: "Issue", slug: "issue"},
    {label: "Progress", slug: "progress"},
    {label: "Idea", slug: "idea"}
  ],

  actions: {
    submit() {
      this.get('post').save().then((post) => {
        this.sendAction('postSaved', post);
      }).catch((error) => {
        if (error.errors.length === 1) {
          this.set('error', error);
        }
      });
    }
  }
});
