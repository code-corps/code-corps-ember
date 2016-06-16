import { Factory, faker } from 'ember-cli-mirage';
import Ember from 'ember';

export default Factory.extend({
  title() {
    return faker.name.title();
  },
  description() {
    return faker.lorem.sentence();
  },
  iconThumbUrl() {
    return faker.image.nature();
  },
  iconLargeUrl() {
    return faker.image.nature();
  },

  slug(i) {
    if(this.title) {
      return Ember.String.underscore(this.title.toLowerCase());
    }
  }
});
