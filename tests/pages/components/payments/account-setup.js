import { isVisible } from 'ember-cli-page-object';

import createAccount from './create-account';
import bankAccount from './bank-account';
import contactInfo from './contact-info';
import fundsRecipient from './funds-recipient';

export default {
  scope: '.account-setup',

  rendersBankAccount: isVisible('.bank-account'),
  rendersBankAccountRequired: isVisible('.bank-account.panel--highlighted'),
  rendersBankAccountVerified: isVisible('.bank-account.panel--highlighted-green'),

  rendersCreateAccount: isVisible('.create-account'),

  rendersFundsRecipient: isVisible('.funds-recipient'),
  rendersFundsRecipientRequired: isVisible('.funds-recipient.panel--highlighted'),
  rendersFundsRecipientVerified: isVisible('.funds-recipient.panel--highlighted-green'),
  rendersFundsRecipientVerifying: isVisible('.funds-recipient.panel'),

  createAccount,
  bankAccount,
  contactInfo,
  fundsRecipient
};
