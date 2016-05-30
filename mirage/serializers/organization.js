import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';

export default MirageApplicationSerializer.extend({
  serialize(modelOrCollection) {
    let response = MirageApplicationSerializer.prototype.serialize.call(this, ...arguments);

    // Required to make a many-to-many relationship work
    // There may be a better way, but I didn't get a chance to research
    // There is a very current issue opened on the mirage git repo
    // https://github.com/samselikoff/ember-cli-mirage/issues/606
    if (modelOrCollection instanceof Model) {
      response.data.relationships.members = this._serializeMembers(modelOrCollection);
    }

    return response;
  },

  _serializeMembers(model) {
    let schema = model._schema;
    let members = [];

    let users = schema.users.all();

    users.models.forEach((user) => {
      user.organizations.models.forEach((organization) => {
        if (organization.id === model.id) {
          members.push({ id: user.id, type: 'users' });
        }
      });
    });


    return { data: members };
  }
});
