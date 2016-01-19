import MirageApplicationSerializer from './application';
import Model from 'ember-cli-mirage/orm/model';

export default MirageApplicationSerializer.extend({
  serialize(modelOrCollection, request={}) {
    //debug flag
    let response;

    if (modelOrCollection instanceof Model) {
      response = this._serializePrimaryModel(modelOrCollection, request);
    } else {
      response = this._serializePrimaryCollection(modelOrCollection, request);
    }

    if (this.included.length) {
      response.included = this.included;
    }

    response.meta = this._generateMeta(modelOrCollection, request);

    return response;
  },

  _generateMeta(modelOrCollection, request) {
    if (modelOrCollection instanceof Model) {
      return {};
    } else {
      let pageNumber = request.queryParams['page[number]'] || 1;
      let pageSize = request.queryParams['page[size]'] || 10;
      let totalRecords = modelOrCollection.length;
      let totalPages = Math.ceil(totalRecords / pageSize);
      return {
        total_records: totalRecords,
        total_pages: totalPages,
        page_size: pageSize,
        current_page: pageNumber
      };
    }
  }

});
