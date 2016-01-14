import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  biography: faker.lorem.paragraph,
  email: faker.internet.email,
  photoLargeUrl: faker.image.avatar,
  photoThumbUrl: faker.image.avatar,
  twitter: faker.internet.userName,
  username: faker.internet.userName,
  website: faker.internet.url,
  type: 'user'
});
