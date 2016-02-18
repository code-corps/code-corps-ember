import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  session: Ember.inject.service(),

  buildURL(modelName, id, snapshot, requestType) {
    if (requestType === 'findRecord') {
      if (parseInt(id) === parseInt(this.get('session.session.authenticated.user_id'))) {
        return this.urlForCurrentUser();
      }
    }
    return this._super(...arguments);
  },

  urlForCurrentUser() {
    var url = [];
    var host = Ember.get(this, 'host');
    var prefix = this.urlPrefix();

    url.push(encodeURIComponent('user'));

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }
});
