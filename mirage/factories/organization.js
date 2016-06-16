import { Factory, faker } from 'ember-cli-mirage';
import Ember from 'ember';

export default Factory.extend({
  name() {
    return faker.internet.userName();
  },
  description() {
    return faker.lorem.paragraph();
  },
  iconThumbUrl() {
    return faker.image.cats();
  },
  iconLargeUrl() {
    return faker.image.cats();
  },
  slug(i) {
    if(this.name) {
      return this.name.toLowerCase();
    }
  },
});
