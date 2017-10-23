import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  body: faker.lorem.paragraph,
  createdAt(i) {
    return moment().subtract(i, 'days');
  }
});
