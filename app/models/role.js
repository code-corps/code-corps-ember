import { equal } from '@ember/object/computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  ability: attr(),
  kind: attr(),
  name: attr(),

  userRoles: hasMany('user-role', { async: true }),

  isCreative: equal('kind', 'creative'),
  isSupport: equal('kind', 'support'),
  isTechnology: equal('kind', 'technology')
});
