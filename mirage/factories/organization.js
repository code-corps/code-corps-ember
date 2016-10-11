import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.internet.userName();
  },
  description() {
    return faker.lorem.paragraph();
  },
  iconThumbUrl() {
    return faker.image.avatar();
  },
  iconLargeUrl() {
    return faker.image.avatar();
  },
  slug() {
    if (this.name) {
      return this.name.toLowerCase();
    }
  }
});
