import Ember from 'ember';

const {
  Controller,
  computed,
  inject: { service }
} = Ember;

export default Controller.extend({
  store: service(),
  currentUser: service(),

  user: computed.alias('currentUser.user'),

  actions: {
    saveSubscription(amount) {
      let project = this.get('project');
      let queryParams = { amount };
      this.transitionToRoute('project.donate', project, { queryParams });
    }
  }
});
