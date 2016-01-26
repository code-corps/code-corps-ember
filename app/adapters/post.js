import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  urlForQuery(query) {
    if (query.projectId) {
      var url = [];
      var host = Ember.get(this, 'host');
      var prefix = this.urlPrefix();

      url.push(encodeURIComponent('projects'));
      url.push(encodeURIComponent(query.projectId));
      url.push(encodeURIComponent('posts'));

      if (prefix) { url.unshift(prefix); }

      url = url.join('/');
      if (!host && url) { url = '/' + url; }
      return url;
    } else {
      this._super(...arguments);
    }
  },

  // just cleaning out query paramters that are used to build the url instead
  // of being added to the end of it
  sortQueryParams: function(query) {
    if (query) {
      delete query.projectId;
    }

    // not sure if we actually need this, but it feels more consistent with
    // the rest of ember to put it here instead of calling store.query with
    // underscored query parameters somewhere in a component
    let serializedQuery = this._serializeQuery(query);

    return this._super(serializedQuery);
  },

  _serializeQuery(query) {
    let serializedQuery = {};

    for (let key in query) {
      let serializedKey = Ember.String.underscore(key);
      serializedQuery[serializedKey] = query[key];
    }

    return serializedQuery;
  }
});
