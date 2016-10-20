import {
  attribute,
  clickable,
  create,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:project/settings/donations'),

  clickStripeConnectButton: clickable('.stripe-connect'),

  stripeConnectButton: {
    scope: '.stripe-connect',
    href: attribute('href')
  }
});
