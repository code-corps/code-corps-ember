import DS from 'ember-data';
import { singularize } from 'ember-inflector';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  createPageMeta(data) {
    let meta = {};

    Object.keys(data).forEach((type) => {
      let link = data[type];
      meta[type] = {};
      let a = document.createElement('a');
      a.href = link;

      a.search.slice(1).split('&').forEach((pairs) => {
        let [param, value] = pairs.split('=');
        if (param == 'page[page]') {
          meta[type].number = parseInt(value);
        }
        if (param == 'page[page-size]') {
          meta[type].size = parseInt(value);
        }
      });
      a = null;
    });

    return meta;
  },

  normalizeQueryResponse(store, klass, payload) {
    let result = this._super(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }

    return result;
  },

  // Our Phoenix API uses singularized model names
  payloadKeyFromModelName(modelName) {
    return singularize(modelName);
  }
});
