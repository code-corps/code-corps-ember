import Ember from 'ember';

const {
  get,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  flashMessages: service(),
  store: service(),

  joinProject(project) {
    let user = get(this, 'currentUser.user');
    let store = get(this, 'store');

    let projectUser = { project, user, role: 'pending' };

    return store.createRecord('project-user', projectUser)
      .save()
      .then(() => this._flashSuccess('Your request has been sent.'));
  },

  _flashSuccess(message) {
    let options = { fixed: true, sticky: false, timeout: 5000 };
    get(this, 'flashMessages').clearMessages().success(message, options);
  }
});
