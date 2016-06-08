import Owner from 'code-corps-ember/models/owner';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Owner.extend({
  base64IconData: attr(),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  name: attr(),
  slug: attr(),

  members: hasMany('user', { async: true }),
  projects: hasMany('project', { async: true }),
});
