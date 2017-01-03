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
  rendersDetailsFormRequired: isVisible('.details-form button'),
  rendersVerificationDocument: isVisible('.verification-document'),
  rendersVerificationDocumentRequired: isVisible('.verification-document input[type=file]'),
  rendersLegalEntityPersonalIdNumber: isVisible('.personal-id-number'),
  rendersLegalEntityPersonalIdNumberRequired: isVisible('.personal-id-number button'),

  individualNameText: text('.funds-recipient__individual-name p'),
  legalEntityBusinessNameText: text('.funds-recipient__business-name p'),

  detailsForm,
  verificationDocument,
  legalEntityPersonalIdNumber
};
