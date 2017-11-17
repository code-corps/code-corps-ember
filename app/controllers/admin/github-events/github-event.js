import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  actions: {
    retry() {
      let githubEvent = get(this, 'model');
      set(githubEvent, 'retry', true);
      githubEvent.save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Retrying the event. You may need to reload the page.');
      }).catch(() => {
        get(this, 'flashMessages').clearMessages().danger('The event could not be retried.');
      });
    }
  }
});
