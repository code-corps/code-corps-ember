import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.lorem.word,
  category: faker.lorem.word,
});