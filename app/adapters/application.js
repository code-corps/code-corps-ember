import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'code-corps-ember/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  coalesceFindRequests: true,
  authorizer: 'authorizer:oauth2',
  host: ENV.API_BASE_URL
});
