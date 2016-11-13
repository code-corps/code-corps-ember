import ApplicationAdapter from './application';
import Ember from 'ember';

const {
  String: { underscore },
  get,
  isEmpty,
  isPresent
} = Ember;

export default ApplicationAdapter.extend({
  // need to delete slug and sluggedRouteSlug properties from the query.
  // otherwise, they will get auto-added to the end of our url
  sortQueryParams(query) {
    query = query || {};

    // to preserve a clean url with just `&page=X` we only
    // transform the page number to the proper JSON api format here, in the
    // adapter, instead of back in the route
    if (isPresent(query.page)) {
      query.page = { page: query.page };
    }

    // we don't want to send the taskType parameter to the API if it does not
    // have a proper value
    if (isEmpty(query.taskType)) {
      delete query.taskType;
    }

    // we don't want to send the status parameter to the API if it does not
    // have a proper value
    if (isEmpty(query.status)) {
      delete query.status;
    }

    // projectId is part of the url in `projects/:projectId/tasks`, so we
    // do not want to see it in the query as well
    if (query.projectId) {
      delete query.projectId;
    }

    // any remaining fields are in camelCase, so we want to serialize them into
    // underscore_format
    let serializedQuery = this._serializeQuery(query);

    return this._super(serializedQuery);
  },

  urlForQuery(query) {
    if (query.projectId) {
      let url = [];
      let host = get(this, 'host');
      let prefix = this.urlPrefix();

      url.push(encodeURIComponent('projects'));
      url.push(encodeURIComponent(query.projectId));
      url.push(encodeURIComponent('tasks'));

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
    if (query.number && query.projectId) {
      let url = [];
      let host = get(this, 'host');
      let prefix = this.urlPrefix();

      url.push(encodeURIComponent('projects'));
      url.push(encodeURIComponent(query.projectId));
      url.push(encodeURIComponent('tasks'));
      url.push(encodeURIComponent(query.number));

      delete query.number;

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

  _serializeQuery(query) {
    let serializedQuery = {};

    for (let key in query) {
      let serializedKey = underscore(key);
      serializedQuery[serializedKey] = query[key];
    }

    return serializedQuery;
  }
});
