import Ember from 'ember';
import ApplicationAdapter from './application';

const { get } = Ember;

export default ApplicationAdapter.extend({
   // need to delete properties from the query which we do not want to see
  // appended to the end of the url as parameters
  sortQueryParams(query) {
    query = query || {};

    if (query.slug) {
      delete query.slug;
    }
    if (query.sluggedRouteSlug) {
      delete query.sluggedRouteSlug;
    }

    return query;
  },

  urlForQuery(query) {
    query = query || {};

    if (query.sluggedRouteSlug) {
      let url = [];
      let host = get(this, 'host');
      let prefix = this.urlPrefix();

      url.push(encodeURIComponent(query.sluggedRouteSlug));
      url.push('projects');

      if (prefix) {
        url.unshift(prefix);
      }

      url = url.join('/');
      if (!host && url) {
        url = `/${url}`;
      }

      return url;
    } else {
      return this._super.apply(arguments);
    }
  },

  urlForQueryRecord(query) {
    query = query || {};

    // if there are slug and sluggedRouteSlug properties in the query, we
    // need to build the url as (prefix/)host/sluggedRouteSlug/slug
    if (query.slug && query.sluggedRouteSlug) {
      let url = [];
      let host = get(this, 'host');
      let prefix = this.urlPrefix();

      url.push(encodeURIComponent(query.sluggedRouteSlug));
      url.push(encodeURIComponent(query.slug));

      if (prefix) {
        url.unshift(prefix);
      }

      url = url.join('/');
      if (!host && url) {
        url = `/${url}`;
      }

      return url;
    } else {
      return this._super.apply(arguments);
    }
  }
});
