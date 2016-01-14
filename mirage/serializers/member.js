import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';

export default MirageApplicationSerializer.extend({
  include: ['model'],

  serialize(modelOrCollection, request={}) {
    let response;

    if (modelOrCollection instanceof Model) {
      response = this._serializePrimaryModel(modelOrCollection, request);
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
