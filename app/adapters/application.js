import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'code-corps-ember/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',

  // TODO: Fix this once many-to-many lands in ember-cli-mirage
  // but as of right now there is no way to make this work for
  // all possible cases
  coalesceFindRequests: true,

  host: ENV.API_BASE_URL,

  // eliminates a deprecation warning
  // default behavior will return true in ember data 2.x
  // so we should consider accounting for that
  shouldBackgroundReloadRecord: function() {
    return false;
  },
});
