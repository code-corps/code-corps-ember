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

  rendersPending: hasClass('panel'),
  rendersRequired: hasClass('panel--highlighted'),

  rendersVerificationDocument: isVisible('.verification-document'),
  rendersVerificationDocumentRequired: isVisible('.verification-document input[type=file]'),

  rendersVerifying: hasClass('panel'),
  rendersVerified: hasClass('panel--highlighted-green'),

  detailsForm,
  legalEntityPersonalIdNumber,
  verificationDocument
};
