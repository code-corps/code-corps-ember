import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  amount: faker.list.cycle(10000, 20000, 15020),
  current: true,
  description: faker.lorem.paragraph
});
