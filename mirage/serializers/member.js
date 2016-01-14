import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';

export default MirageApplicationSerializer.extend({
  // we're faking a polymorphic relationship by including
  // user and organization
  // in the serialize method, we then rename whichever of those is present
  // into 'model'
  include: ['organization', 'user'],

  serialize(modelOrCollection, request={}) {
    let response;

    if (modelOrCollection instanceof Model) {
      response = this._serializePrimaryModel(modelOrCollection, request);
      // this is the actual, custom part for the member serializer
      // if there's a relationships.user or a relationships.organization
      // it needs to be renamed to relationships.model to simulate a polymorphic
      // relationship
      response.data = this._renameRelationships(response.data);
    } else {
      response = this._serializePrimaryCollection(modelOrCollection, request);
      response.data = response.data.map(this._renameRelationships);
    }

    if (this.included.length) {
      response.included = this.included;
    }

    return response;
  },

  _renameRelationships(data) {
    // renames relationships.user or a relationships.organization
    // into relationships.model to simulate a polymorphic relationship
    if (data.relationships.organization) {
      data.relationships.model = data.relationships.organization;
      delete data.relationships.organization;
    } else if (data.relationships.user) {
      data.relationships.model = data.relationships.user;
      delete data.relationships.user;
    }

    return data;
  }
});
