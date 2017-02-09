import Ember from 'ember';

const {
  Controller,
  computed: { alias, mapBy },
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  currentUser: service(),

  projectUsers: mapBy('project.projectUsers', 'user'),
  usersCount: alias('members.length'),
  projectSkills: mapBy('project.projectSkills', 'skill'),

  actions: {
    saveSubscription(amount) {
      let project = get(this, 'project');
      let queryParams = { amount };
      this.transitionToRoute('project.donate', project, { queryParams });
    }
  }
});
