import ApplicationAdapter from './application';
import Ember from 'ember';

const {
  get
} = Ember;

export default ApplicationAdapter.extend({
  urlForQueryRecord(query = {}) {
    // if there's a projectId property in the query, we
    // need to build the url as (prefix/)host/projects/projectId/stripe-auth
    if (query.projectId) {
      let url = [];
      let host = get(this, 'host');
      let prefix = this.urlPrefix();

      url.push(encodeURIComponent('projects'));
      url.push(encodeURIComponent(query.projectId));
      url.push(encodeURIComponent('stripe-auth'));

      delete query.projectId;

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
