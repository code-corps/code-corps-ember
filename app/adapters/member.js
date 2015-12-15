import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, record, action, query) {
    var url = [];
    var host = Ember.get(this, 'host');
    var prefix = this.urlPrefix();

    query = query || {};

    if (id && !Ember.isArray(id)) {
      url.push(encodeURIComponent(id));
    } else if (action === 'queryRecord' && query.slug) {
      url.push(encodeURIComponent(query.slug));
    }

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }
});
