import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.internet.userName,
  modelType: 'user',

  slug() {
    return this.name().toLowerCase();
  }
});
