import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  body() {
    return faker.lorem.paragraph();
  },
  insertedAt(i) {
    return moment().subtract(i, 'days');
  },
  number(i) {
    return i + 1;
  },
  order() {
    return (this.position || 0) * 100;
  },
  position(i) {
    return i + 1;
  },
  status: 'open',
  taskType: faker.list.cycle('task', 'idea', 'issue'),
  title() {
    return faker.lorem.sentence();
  }
});
