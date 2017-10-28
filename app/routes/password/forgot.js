import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({

  ajax: service(),

  actions: {
    forgotPassword(email) {
      return get(this, 'ajax').request('/password/forgot', {
        method: 'POST',
        data: {
          email
        }
      }).then(() => {
        this.transitionTo('index');
      });
    }
  }
});
