import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  member: belongsTo('user'),
  organization: belongsTo()
});
