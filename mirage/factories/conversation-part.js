import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  body: faker.lorem.paragraph,

  insertedAt(i) {
    return moment().subtract(i, 'days');
  },
  readAt(i) {
    return moment().subtract(i, 'days');
  },
  updatedAt(i) {
    return moment().subtract(i, 'days');
  }
  // author: belongsTo('user', { async: true }),
  // conversation: belongsTo('conversation', { async: true })
});
