import { isVisible } from 'ember-cli-page-object';

import createAccount from './create-account';
import bankAccount from './bank-account';
import contactInfo from './contact-info';
import fundsRecipient from './funds-recipient';

export default {
  scope: '.account-setup',

  rendersBankAccount: isVisible('.bank-account'),
  rendersBankAccountRequired: isVisible('.bank-account.account-setup__section--required'),
  rendersBankAccountVerified: isVisible('.bank-account.account-setup__section--verified'),

  rendersCreateAccount: isVisible('.create-account'),

  rendersFundsRecipient: isVisible('.funds-recipient'),
  rendersFundsRecipientRequired: isVisible('.funds-recipient.account-setup__section--required'),
  rendersFundsRecipientVerified: isVisible('.funds-recipient.account-setup__section--verified'),
  rendersFundsRecipientVerifying: isVisible('.funds-recipient.account-setup__section--verifying'),

  createAccount,
  bankAccount,
  contactInfo,
  fundsRecipient
};
