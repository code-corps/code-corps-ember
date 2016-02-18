import DS from 'ember-data';
import Owner from 'code-corps-ember/models/owner';

var attr = DS.attr;

export default Owner.extend({
  name: attr(),
  slug: attr(),
});
