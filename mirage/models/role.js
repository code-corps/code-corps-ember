import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  userRoles: hasMany('user-role')
});
