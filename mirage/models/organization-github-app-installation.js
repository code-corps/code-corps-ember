import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  githubAppInstallation: belongsTo(),
  organization: belongsTo()
});
