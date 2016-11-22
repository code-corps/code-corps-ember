import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  brand: faker.list.cycle('Visa', 'MasterCard'),
  expMonth: '01',
  expYear: '2022',
  last4: faker.list.cycle('4242', '4444')
});
