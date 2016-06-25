import ManyToManySerializer from './many-to-many';
import Collection from 'ember-cli-mirage/orm/collection';

export default ManyToManySerializer.extend({
  // TODO: Make this work when relationship work
  // include: ['categories'],
  // categories(model) {
  //   let models = model.userCategories.models.map(om => om.category);
  //   return new Collection('category', models);
  // },
  include: ['organizations'],
  organizations(model) {
    let models = model.organizationMemberships.models.map(om => om.organization);
    return new Collection('organization', models);
  }
});
