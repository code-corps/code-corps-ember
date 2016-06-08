import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.hacker.phrase,
  body: faker.lorem.paragraph,
  likesCount: faker.random.number,
  status: 'open',
  postType: faker.list.random('task', 'idea', 'issue', 'progress'),
  number(i) {
    return i + 1;
  }
});
