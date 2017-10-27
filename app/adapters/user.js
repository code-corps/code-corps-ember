import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import ApplicationAdapter from './application';

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
