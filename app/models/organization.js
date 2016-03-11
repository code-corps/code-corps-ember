import DS from 'ember-data';
import Owner from 'code-corps-ember/models/owner';

var attr = DS.attr;

export default Owner.extend({
  name: attr(),
  slug: attr(),
  description: attr(),
  base64IconData: attr(),
  iconThumbUrl: attr(),
  iconLargeUrl: attr(),
  projects: DS.hasMany('project', { async: true }),
  members: DS.hasMany('user', { async: true }),
});
