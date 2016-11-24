import { Factory, faker } from 'ember-cli-mirage';

// Stripe Test Card Numbers
// https://stripe.com/docs/testing#cards

export default Factory.extend({
  brand: faker.list.cycle(
      'American Express',
      'Diners Club',
      'Discover',
      'JCB',
      'MasterCard',
      'Visa'
  ),
  expMonth: '01',
  expYear: '2022',
  last4: faker.list.cycle(
      '0005',
      '5904',
      '1117',
      '0000',
      '4444',
      '4242'
  )
});
