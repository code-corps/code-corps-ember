import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQueryRecord: function(query) {
    query = query || {};

    // if there are slug and memberSlug properties in the query, we
    // need to build the url as (prefix/)host/memberSlug/slug
    if (query.slug && query.memberSlug) {
      var url = [];
      var host = Ember.get(this, 'host');
      var prefix = this.urlPrefix();

      url.push(encodeURIComponent(query.memberSlug));
      url.push(encodeURIComponent(query.slug));

      if (prefix) { url.unshift(prefix); }

      url = url.join('/');
      if (!host && url) { url = '/' + url; }

      return url;
    } else {
      return this._super.apply(arguments);
    }
  },

  // need to delete slug and memberSlug properties from the query.
  // otherwise, they will get auto-added to the end of our url
  sortQueryParams: function(query) {
    query = query || {};
    if (query.slug && query.memberSlug) {
      delete query.slug;
      delete query.memberSlug;
      return query;
    } else {
      return this._super.apply(arguments);
    }
  }
});
