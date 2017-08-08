import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  cloudinaryPublicId: attr(),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  name: attr(),
  slug: attr(),

  organizationGithubAppInstallations: hasMany('organization-github-app-installation', { async: true }),
  owner: belongsTo('user', { async: true }),
  projects: hasMany('project', { async: true }),
  stripeConnectAccount: belongsTo('stripe-connect-account', { async: true })
});
