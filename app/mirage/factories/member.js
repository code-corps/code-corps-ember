import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: faker.internet.userName,

  slug() {
    return this.name().toLowerCase();
  }
});
