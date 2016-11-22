import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  body: faker.list.random('Visa', 'MasterCard'),
  expMonth: '01',
  expYear: '2022',
  last4: '4242'
});
