import { isVisible } from 'ember-cli-page-object';

import bankAccountComponent from './bank-account';
import contactInfoComponent from './contact-info';
import fundsRecipientComponent from './funds-recipient';

export default {
  scope: '.account-setup',

  rendersFundsRecipient: isVisible('.funds-recipient'),
  rendersBankAccount: isVisible('.bank-account'),

  bankAccount: bankAccountComponent,
  contactInfo: contactInfoComponent,
  fundsRecipient: fundsRecipientComponent
};
