import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  currentUser: Ember.inject.service(),

  buildURL(modelName, id, snapshot, requestType) {
    if (requestType === 'updateRecord') {
      if (id === this.get('currentUser.user.id')) {
        return this.urlForProfileEdit();
      }
    }
    return this._super(...arguments);
  },

  urlForProfileEdit() {
    var url = [];
    var host = Ember.get(this, 'host');
    var prefix = this.urlPrefix();

    url.push(encodeURIComponent('users'));
    url.push(encodeURIComponent(this.get('currentUser.user.id')));

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  },
});
