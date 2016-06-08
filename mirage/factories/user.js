import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  biography() {
    return faker.lorem.paragraph();
  },
  base64PhotoData: null,
  email() {
    return faker.internet.email();
  },
  photoLargeUrl() {
    return faker.image.avatar();
  },
  photoThumbUrl() {
    return faker.image.avatar();
  },
  twitter() {
    return faker.internet.domainWord();
  },
  username() {
    return faker.internet.domainWord();
  },
  website() {
    return faker.internet.url();
  },
});
