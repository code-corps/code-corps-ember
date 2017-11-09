import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  action: faker.hacker.verb,
  eventType: faker.hacker.noun,
  failureReason: faker.hacker.phrase,
  insertedAt: moment.utc(),
  status: faker.hacker.ingverb
});
