import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  urlForQueryRecord: function(query) {
    query = query || {};

    // if there are slug and sluggedRouteSlug properties in the query, we
    // need to build the url as (prefix/)host/sluggedRouteSlug/slug
    if (query.number && query.sluggedRouteSlug && query.projectSlug) {
      var url = [];
      var host = Ember.get(this, 'host');
      var prefix = this.urlPrefix();

      url.push(encodeURIComponent(query.sluggedRouteSlug));
      url.push(encodeURIComponent(query.projectSlug));
      url.push(encodeURIComponent('posts'));
      url.push(encodeURIComponent(query.number));


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
    if (query.projectSlug && query.sluggedRouteSlug && query.number) {
      delete query.projectSlug;
      delete query.sluggedRouteSlug;
      delete query.number;
      return query;
    } else {
      return this._super.apply(arguments);
    }
  }
});
