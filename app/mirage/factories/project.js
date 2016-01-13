import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: faker.name.title,
  description: faker.lorem.sentence,
  icon_thumb_url: faker.image.imageUrl,
  icon_large_url: faker.image.imageUrl,

  slug() {
    return this.title().toLowerCase();
  }
});
