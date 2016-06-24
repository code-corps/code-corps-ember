import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  prefetchBodyWithMentions(record, type) {
    let relationshipType = `${type}UserMentions`;
    let body = record.get('body');
    let mentions = record.get(relationshipType);
    return parse(body, mentions);
  },

  fetchBodyWithMentions(record, type) {
    let store = this.get('store');

    let mentionType = `${type}-user-mention`;
    let keyForParentId = `${type}_id`;
    let queryParams = {};
    queryParams[keyForParentId] = record.id;

    return store.query(mentionType, queryParams).then((mentions) => {
      return parse(record.get('body'), mentions);
    });
  }
});
