import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-post-new-form'],

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
    this.get('post').set('project', this.get('project'));

    let userId =  this.get('session.session.authenticated.user_id');
    if (Ember.isPresent(userId)) {
      this.get('store').find('user', userId).then((user) => {
        this.get('post').set('user', user);
      });
    }
  },

  actions: {
    submit() {
      this.get('post').save().then(Ember.K).catch((error) => {
        if (error.errors.length === 1) {
          this.set('error', error);
        }
      });
    }
  }
});
