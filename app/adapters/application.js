import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'code-corps-ember/config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',

  // TODO: Fix this once many-to-many lands in ember-cli-mirage
  // but as of right now there is no way to make this work for
  // all possible cases
  coalesceFindRequests: true,

  host: ENV.API_BASE_URL
});
