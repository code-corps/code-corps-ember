import Ember from 'ember';

export default Ember.Component.extend({
  types: [
    {label: "Task",  slug: "task"},
    {label: "Issue", slug: "issue"},
    {label: "Progress", slug: "progress"},
    {label: "Idea", slug: "idea"}
  ],

  store: Ember.inject.service(),
  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('post', this.get('store').createRecord('post'));
    debugger;
    this.get('post').set('project', this.get('project'));
  },

  actions: {
    submit() {
      this.get('post').save().then(() => {
        debugger;
      }).catch((error) => {
        if (error.errors.length === 1) {
          this.set('error', error);
        }
      });
    }
  }
});
