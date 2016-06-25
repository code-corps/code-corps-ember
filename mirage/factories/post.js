import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.lorem.sentence,
  body: faker.lorem.paragraph,
  likesCount: faker.random.number,
  status: 'open',
  postType: faker.list.random('task', 'idea', 'issue'),
  number(i) {
    return i;
  }
});
