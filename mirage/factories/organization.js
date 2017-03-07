import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.internet.userName,
  description: faker.lorem.paragraph,
  iconThumbUrl: faker.image.imageUrl,
  iconLargeUrl: faker.image.imageUrl,

  slug() {
    if (this.name) {
      return this.name.toLowerCase();
    }
  },

  // in real-life scenarios, a organization must necessarily have an owner
  // this is not the case in mirage, so we make it so
  afterCreate(organization, server) {
    if (!organization.owner) {
      organization.owner = server.create('user');
      organization.save();
    }

    if (!organization.sluggedRoute) {
      organization.sluggedRoute = server.create('slugged-route', { slug: organization.slug, organization });
      organization.save();
    }
  }
});
