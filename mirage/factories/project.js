import { Factory, faker } from 'ember-cli-mirage';
import Ember from 'ember';

export default Factory.extend({
  title: faker.name.title,
  description: faker.lorem.sentence,
  iconThumbUrl: faker.image.imageUrl,
  iconLargeUrl: faker.image.imageUrl,

  slug() {
    return Ember.String.underscore(this.title().toLowerCase());
  }
});
