import Ember from 'ember';

const {
  Controller,
  computed: { alias },
  get
} = Ember;

export default Controller.extend({
  amount: 25,
  queryParams: ['amount'],

  project: alias('model'),

  actions: {
    continueToCheckout(amount) {
      let project = get(this, 'project');
      let queryParams = { amount };
      this.transitionToRoute('project.checkout', project, { queryParams });
    }
  }
});
