import Ember from 'ember';

const {
  Controller,
  computed: { alias, mapBy },
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  currentUser: service(),
  store: service(),

  members: mapBy('project.organization.organizationMemberships', 'member'),
  membersCount: alias('members.length'),
  projectSkills: mapBy('project.projectSkills', 'skill'),
  user: alias('currentUser.user'),

  actions: {
    saveSubscription(amount) {
      let project = get(this, 'project');
      let queryParams = { amount };
      this.transitionToRoute('project.donate', project, { queryParams });
    }
  }
});
