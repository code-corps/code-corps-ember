import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';

export default MirageApplicationSerializer.extend({
  serialize(modelOrCollection, request={}) {
    let response;

    if (modelOrCollection instanceof Model) {
      response = this._serializePrimaryModel(modelOrCollection, request);
    } else {
      response = this._serializePrimaryCollection(modelOrCollection, request);
    }

    if (this.included.length) {
      response.included = this.included;
    }

    // this is the actual, custom part for the serializer
    // the difference is, that after performing the standard serialization,
    // it will call the rename method to "fix" the relationship in the payload
    if (modelOrCollection instanceof Model) {
      response.data = this._renameRelationships(response.data);
    } else {
      response.data = response.data.map(this._renameRelationships);
    }

    return response;
  },

  _renameRelationships(data) {
    // renames relationships.user or a relationships.organization
    // into relationships.model to simulate a polymorphic relationship
    let actualName = this.renameTo;
    let possibleNames = this.include;

    possibleNames.forEach((name) => {
      if (data.relationships[name]) {
        data.relationships[actualName] = data.relationships[name];
        delete data.relationships[name];
      }
    });

    return data;
  }
});
