import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.internet.userName();
  },
  description() {
    return faker.lorem.paragraph();
  },
  iconThumbUrl() {
    return faker.image.imageUrl();
  },
  iconLargeUrl() {
    return faker.image.imageUrl();
  },
  slug() {
    if (this.name) {
      return this.name.toLowerCase();
    }
  }
});
