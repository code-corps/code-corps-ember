import Ember from 'ember';
import ApplicationAdapter from './application';

const { get } = Ember;

export default ApplicationAdapter.extend({
  /**
   * Clears out query parameters which are used to build a url.
   * This would be the `slug` parameter
   *
   * @method sortQueryParams
   * @param  Object query query object
   * @return Object modified query object
   */
  sortQueryParams(query) {
    query = query || {};

    if (query.slug) {
      delete query.slug;
    }

    return query;
  },

  /**
   * Builds URL from query object if the object contains
   * `sluggedRouteSlug` and `slug` keys
   *
   * @method urlForQueryRecord
   * @param  Object query Object containing all query parameters for the request
   * @return String       Built URL string - `/:sluggedRouteSlug`
   */
  urlForQueryRecord(query) {
    query = query || {};

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
