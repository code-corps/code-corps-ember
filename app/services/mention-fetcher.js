import Ember from 'ember';
// import { parse } from 'code-corps-ember/utils/mention-parser';

// NOTE: mentions are disabled until we reimplement them phoenix-side, so right now
// this service just returns the unmodified body

const {
  inject: { service },
  RSVP,
  Service
} = Ember;

export default Service.extend({
  store: service(),

  prefetchBodyWithMentions(record/* , type*/) {
    let body = record.get('body');

    return body;

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

    return RSVP.resolve(record.get('body'));
  }
});
