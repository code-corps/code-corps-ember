import Ember from 'ember';

const {
  Controller,
  computed: { alias, mapBy },
  inject: { service }
} = Ember;

export default Controller.extend({
  store: service(),
  currentUser: service(),

  user: alias('currentUser.user'),
  projectSkills: mapBy('project.projectSkills', 'skill'),

  actions: {
    saveSubscription(amount) {
      let project = this.get('project');
      let queryParams = { amount };
      this.transitionToRoute('project.donate', project, { queryParams });
    }
  }
});
