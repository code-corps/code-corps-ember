import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';
import Collection from 'ember-cli-mirage/orm/collection';

export default MirageApplicationSerializer.extend({
  include: ['members'],
  members(model) {
    let models = model.organizationMemberships.models.map(om => om.member);
    return new Collection('user', models);
  }
});
