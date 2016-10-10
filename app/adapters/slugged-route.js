import Ember from 'ember';
import ApplicationAdapter from './application';

const { get } = Ember;

export default ApplicationAdapter.extend({
  // need to drop out the slug query parameter,
  // otherwise it will get auto-added to the end of the url
  sortQueryParams(query) {
    query = query || {};

    if (query.slug) {
      delete query.slug;
    }

    return query;
  },

  urlForQueryRecord(query) {
    query = query || {};

    // if the query contains a slug property, then the URL for the slugged route
    // is formed as (prefix/)(host)/slug
    if (query.slug) {
      let url = [];
      let host = get(this, 'host');
      let prefix = this.urlPrefix();

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
