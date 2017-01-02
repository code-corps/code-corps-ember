import { hasClass, isVisible, text } from 'ember-cli-page-object';

import detailsForm from './funds-recipient/details-form';
import verificationDocument from './funds-recipient/verification-document';
import legalEntityPersonalIdNumber from './funds-recipient/personal-id-number';

export default {
  scope: '.funds-recipient',

  rendersPending: hasClass('account-setup__section--pending_requirement'),
  rendersRequired: hasClass('account-setup__section--required'),
  rendersVerifying: hasClass('account-setup__section--verifying'),
  rendersVerified: hasClass('account-setup__section--verified'),

  rendersDetailsForm: isVisible('.details-form'),
  rendersVerificationDocument: isVisible('.verification-document'),
  renderslegalEntityPersonalIdNumber: isVisible('.personal-id-number'),

  individualNameText: text('.funds-recipient__individual-name p'),
  legalEntityBusinessNameText: text('.funds-recipient__business-name p'),

  detailsForm,
  verificationDocument,
  legalEntityPersonalIdNumber
};
