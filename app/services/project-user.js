import { get } from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  currentUser: service(),
  flashMessages: service(),
  store: service(),

  flashOptions: { fixed: true, sticky: false, timeout: 5000 },

  joinProject(project) {
    let user = get(this, 'currentUser.user');
    let store = get(this, 'store');

    let projectUser = { project, user, role: 'pending' };

    return store.createRecord('project-user', projectUser)
      .save()
      .then(() => this._flashSuccess('Your request has been sent.'))
      .catch(() => this._flashError('Your request has not been sent.'));
  },

  _flashSuccess(message) {
    get(this, 'flashMessages').clearMessages().success(message, get(this, 'flashOptions'));
  },

  _flashError(message) {
    get(this, 'flashMessages').clearMessages().danger(message, get(this, 'flashOptions'));
  }
});
