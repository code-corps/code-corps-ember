import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.internet.userName,

  slug() {
    return this.name().toLowerCase();
  },

  type: 'organization'
});
