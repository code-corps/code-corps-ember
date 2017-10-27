import { get } from '@ember/object';
import RSVP from 'rsvp';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),

  prefetchBodyWithMentions(record/* , type*/) {
    return get(record, 'body');

    /*
    let relationshipType = `${type}UserMentions`;
    let mentions = record.get(relationshipType);
    return parse(body, mentions);
    */
  },

  fetchBodyWithMentions(record/* , type*/) {
    /*
    let store = this.get('store');
    let mentionType = `${type}-user-mention`;
    let keyForParentId = `${type}_id`;
    let queryParams = {};
    queryParams[keyForParentId] = record.id;

    return store.query(mentionType, queryParams).then((mentions) => {
      return parse(record.get('body'), mentions);
    });
    */

    return RSVP.resolve(get(record, 'body'));
  }
});
