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
});
