import { Factory, faker } from 'ember-cli-mirage';
import Ember from 'ember';

const { String } = Ember;

export default Factory.extend({
  closedTasksCount: 0,
  description: faker.lorem.sentence,
  iconLargeUrl: faker.image.imageUrl,
  iconThumbUrl: faker.image.imageUrl,
  openTasksCount: 0,
  title: faker.name.title,
  website: faker.url,

  slug() {
    if (this.title) {
      return String.underscore(this.title.toLowerCase());
    }
  },

  // ensures associations exist if they haven't been provided
  afterCreate(project, server) {
    if (!project.organization) {
      project.organization = server.create('organization');
      project.save();
    }
  }
});
