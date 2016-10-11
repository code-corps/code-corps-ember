import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  ability: attr(),
  kind: attr(),
  name: attr(),

  userRoles: hasMany('user-role', { async: true }),

  isCreative: computed.equal('kind', 'creative'),
  isSupport: computed.equal('kind', 'support'),
  isTechnology: computed.equal('kind', 'technology')
});
