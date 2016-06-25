import ManyToManySerializer from './many-to-many';
import Collection from 'ember-cli-mirage/orm/collection';

export default ManyToManySerializer.extend({
  include: ['members'],
  members(model) {
    let models = model.organizationMemberships.models.map(om => om.member);
    return new Collection('user', models);
  }
});
