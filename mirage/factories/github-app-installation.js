import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  githubAccountAvatarUrl: faker.image.imageUrl,
  githubAccountLogin: faker.internet.domainWord,
  githubAccountType: faker.list.cycle('Organization', 'User')
});
