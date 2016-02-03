import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  urlForQueryRecord: function(query) {
    query = query || {};

    // if there are slug and sluggedRouteSlug properties in the query, we
    // need to build the url as (prefix/)host/sluggedRouteSlug/slug
    if (query.number && query.projectId) {
      var url = [];
      var host = Ember.get(this, 'host');
      var prefix = this.urlPrefix();

      url.push(encodeURIComponent('projects'));
      url.push(encodeURIComponent(query.projectId));
      url.push(encodeURIComponent('posts'));
      url.push(encodeURIComponent(query.number));

      delete query.number;

      if (prefix) { url.unshift(prefix); }

      url = url.join('/');
      if (!host && url) { url = '/' + url; }

      return url;
    } else {
      return this._super.apply(arguments);
    }
  },

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
      return this._super.apply(arguments);
    }
  },

  // need to delete slug and sluggedRouteSlug properties from the query.
  // otherwise, they will get auto-added to the end of our url
  sortQueryParams: function(query) {
    query = query || {};

    if (query.projectId) {
      delete query.projectId;
    }

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
