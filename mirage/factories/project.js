import { Factory, faker } from 'ember-cli-mirage';
import Ember from 'ember';

export default Factory.extend({
  closedPostsCount: 0,
  description: faker.lorem.sentence,
  iconLargeUrl: faker.image.imageUrl,
  iconThumbUrl: faker.image.imageUrl,
  openPostsCount: 0,
  title: faker.name.title,

  slug() {
    if(this.title) {
      return Ember.String.underscore(this.title.toLowerCase());
    }
  }
});
