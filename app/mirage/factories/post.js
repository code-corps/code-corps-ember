import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: faker.lorem.sentence,
  body: faker.lorem.paragraph,
  likesCount: faker.random.number,
  status: 'open',
  post_type: 'task',
});
