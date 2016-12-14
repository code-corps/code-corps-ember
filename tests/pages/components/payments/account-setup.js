import bankAccountComponent from './bank-account';
import contactInfoComponent from './contact-info';
import fundsRecipientComponent from './funds-recipient';

export default {
  scope: '.account-setup',

  bankAccount: bankAccountComponent,
  contactInfo: contactInfoComponent,
  fundsRecipient: fundsRecipientComponent
};
