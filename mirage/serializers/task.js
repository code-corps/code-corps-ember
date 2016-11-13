import MirageApplicationSerializer from './application';

export default MirageApplicationSerializer.extend({
  include: ['comments', 'comment-user-mentions', 'task-user-mentions'],
  serialize(modelOrCollection) {
    let response = MirageApplicationSerializer.prototype.serialize.call(this, ...arguments);

    // this is how we simulate the paging meta object
    if (modelOrCollection.meta) {
      response.meta = modelOrCollection.meta;
    }

    return response;
  }
});
