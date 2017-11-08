import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  admin: false,
  biography: faker.lorem.paragraph,
  email: faker.internet.email,
  photoLargeUrl: faker.image.avatar,
  photoThumbUrl: faker.image.avatar,
  twitter: faker.internet.domainWord,
  username: faker.internet.domainWord,
  website: faker.internet.url,
  base64PhotoData: null,

  // ensures creation of associated records if they were not otherwise specified
  afterCreate(user, server) {
    if (!user.sluggedRoute) {
      user.sluggedRoute = server.create('slugged-route', { slug: user.username, user });
      user.save();
    }
  }
});
