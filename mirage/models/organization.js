import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizationGithubAppInstallations: hasMany('organization-github-app-installation'),
  owner: belongsTo('user'),
  projects: hasMany(),
  stripeConnectAccount: belongsTo('stripe-connect-account')
});
