import Ember from 'ember';
import ApplicationAdapter from './application';

const {
  get,
  inject: { service }
} = Ember;

export default ApplicationAdapter.extend({
  currentUser: service(),

  buildURL(modelName, id, snapshot, requestType) {
    if (requestType === 'updateRecord') {
      if (id === get(this, 'currentUser.user.id')) {
        return this.urlForProfileEdit();
      }
    }
    return this._super(...arguments);
  },

  urlForProfileEdit() {
    let url = [];
    let host = get(this, 'host');
    let prefix = this.urlPrefix();

    url.push(encodeURIComponent('users'));
    url.push(encodeURIComponent(get(this, 'currentUser.user.id')));

    if (prefix) {
      url.unshift(prefix);
    }

    url = url.join('/');
    if (!host && url) {
      url = `/${url}`;
    }

    return url;
  }
});
