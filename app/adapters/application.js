import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'code-corps-ember/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: ENV.API_BASE_URL,

  // eliminates a deprecation warning
  // default behavior will return true in ember data 2.x
  // so we should consider accounting for that
  shouldBackgroundReloadRecord: function() {
    return false;
  }
});
