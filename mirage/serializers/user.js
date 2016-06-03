import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';
import Collection from 'ember-cli-mirage/orm/collection';

export default MirageApplicationSerializer.extend({
  // TODO: Make this work when relationship work
  // include: ['categories'],
  // categories(model) {
  //   let models = model.userCategories.models.map(om => om.category);
  //   return new Collection('category', models);
  // },
  serialize(modelOrCollection) {
    let response = MirageApplicationSerializer.prototype.serialize.call(this, ...arguments);

    // Required to make a many-to-many relationship work
    // There may be a better way, but I didn't get a chance to research
    // There is a very current issue opened on the mirage git repo
    // https://github.com/samselikoff/ember-cli-mirage/issues/606
    if (modelOrCollection instanceof Model) {
      response.data.relationships.organizations = this._serializeOrganizations(modelOrCollection);
    }

    return response;
  },

  _serializeOrganizations(model) {
    let schema = model._schema;
    let organizations = [];

    schema.organizations.all().models.forEach((organization) => {
      organization.members.models.forEach((user) => {
        if (user.id === model.id) {
          organizations.push({ id: organization.id, type: 'organizations' });
        }
      });
    });


    return { data: organizations };
  }
});
