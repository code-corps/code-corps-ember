import { fillable, clickable } from 'ember-cli-page-object';
import birthDate from 'code-corps-ember/tests/pages/components/select/birth-date';
import country from 'code-corps-ember/tests/pages/components/select/country-select';
import state from 'code-corps-ember/tests/pages/components/select/state-select';

export default {
  scope: '.details-form',

  selectIndividual: clickable('input[value="individual"]'),
  selectBusiness: clickable('input[value="business"]'),

  businessName: fillable('input[name=business-name]'),
  businessEin: fillable('input[name=business-ein]'),

  firstName: fillable('input[name=first-name]'),
  lastName: fillable('input[name=last-name]'),

  birthDate,

  address1: fillable('input[name=address-1]'),
  address2: fillable('input[name=address-2]'),
  city: fillable('input[name=city]'),
  state,
  zip: fillable('input[name=zip]'),
  country,

  ssnLast4: fillable('input[name=ssn-last4]'),

  clickSubmit: clickable('input[type=submit]')
};
