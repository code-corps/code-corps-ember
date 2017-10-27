import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { get } from '@ember/object';

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
