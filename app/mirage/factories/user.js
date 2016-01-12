import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  biography: faker.lorem.paragraph,
  email: faker.internet.email,
  photo_large_url: faker.image.avatar,
  photo_thumb_url: faker.image.avatar,
  twitter: faker.internet.userName,
  username: faker.internet.userName,
  website: faker.internet.url,
  type: 'user'
});
