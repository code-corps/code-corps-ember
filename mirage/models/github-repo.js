import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  githubAppInstallation: belongsTo('github-app-installation')
});
