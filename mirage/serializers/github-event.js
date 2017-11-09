import MirageApplicationSerializer from './application';

export default MirageApplicationSerializer.extend({
  serialize(modelOrCollection) {
    let response = MirageApplicationSerializer.prototype.serialize.call(this, ...arguments);

    // simulate the pagination links object
    if (modelOrCollection.meta) {
      response.links = modelOrCollection.meta;
    }

    return response;
  }
});
