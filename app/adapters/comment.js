import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  // need to delete slug and sluggedRouteSlug properties from the query.
  // otherwise, they will get auto-added to the end of our url
  sortQueryParams: function(query) {
    query = query || {};
    if (query.postId) {
      delete query.postId;
      return query;
    } else {
      return this._super.apply(arguments);
    }
  },

  urlForQuery: function(query) {
    query = query || {};

    // if there are slug and sluggedRouteSlug properties in the query, we
    // need to build the url as (prefix/)host/sluggedRouteSlug/slug
    if (query.postId) {
      var url = [];
      var host = Ember.get(this, 'host');
      var prefix = this.urlPrefix();

      url.push(encodeURIComponent('posts'));
      url.push(encodeURIComponent(query.postId));
      url.push(encodeURIComponent('comments'));

      if (prefix) { url.unshift(prefix); }

      url = url.join('/');
      if (!host && url) { url = '/' + url; }

      return url;
    } else {
      return this._super.apply(arguments);
    }
  },
});
