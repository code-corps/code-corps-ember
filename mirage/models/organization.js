import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  owner: belongsTo('user'),
  projects: hasMany(),
  stripeConnectAccount: belongsTo()
});
