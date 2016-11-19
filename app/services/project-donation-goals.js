import Ember from 'ember';

const {
  get,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  store: service(),

  reload(project) {
    return get(project, 'donationGoals').reload();
  }
});
