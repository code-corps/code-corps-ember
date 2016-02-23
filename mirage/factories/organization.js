import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.internet.userName,
  description: faker.lorem.paragraph,
  iconThumbUrl: faker.image.avatar,
  iconLargeUrl: faker.image.avatar,

  slug() {
    return this.name().toLowerCase();
  },
});
