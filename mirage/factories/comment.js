import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  body: faker.lorem.paragraph
});
