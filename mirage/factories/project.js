import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.name.title,
  description: faker.lorem.sentence,
  iconThumbUrl: faker.image.imageUrl,
  iconLargeUrl: faker.image.imageUrl,

  slug() {
    return this.title().toLowerCase();
  }
});
