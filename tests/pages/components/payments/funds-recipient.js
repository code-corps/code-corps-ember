import { hasClass, isVisible, text } from 'ember-cli-page-object';

import detailsForm from './funds-recipient/details-form';
import verificationDocument from './funds-recipient/verification-document';
import legalEntityPersonalIdNumber from './funds-recipient/personal-id-number';

export default {
  scope: '.funds-recipient',

  individualNameText: text('.funds-recipient__individual-name p'),
  legalEntityBusinessNameText: text('.funds-recipient__business-name p'),

  rendersDetailsForm: isVisible('.details-form'),
  rendersDetailsFormRequired: isVisible('.details-form button'),

  rendersLegalEntityPersonalIdNumber: isVisible('.personal-id-number'),
  rendersLegalEntityPersonalIdNumberRequired: isVisible('.personal-id-number button'),

  rendersPending: hasClass('account-setup__section--pending_requirement'),
  rendersRequired: hasClass('account-setup__section--required'),

  rendersVerificationDocument: isVisible('.verification-document'),
  rendersVerificationDocumentRequired: isVisible('.verification-document input[type=file]'),

  rendersVerifying: hasClass('account-setup__section--verifying'),
  rendersVerified: hasClass('account-setup__section--verified'),

  detailsForm,
  legalEntityPersonalIdNumber,
  verificationDocument
};
