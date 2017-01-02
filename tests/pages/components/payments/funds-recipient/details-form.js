import { fillable, clickable } from 'ember-cli-page-object';
import birthDate from 'code-corps-ember/tests/pages/components/select/birth-date';
import country from 'code-corps-ember/tests/pages/components/select/country-select';
import state from 'code-corps-ember/tests/pages/components/select/state-select';

export default {
  scope: '.details-form',

  selectIndividual: clickable('input[value="individual"]'),
  selectBusiness: clickable('input[value="business"]'),

  legalEntityBusinessName: fillable('input[name=legal-entity-business-name]'),
  legalEntityBusinessTaxId: fillable('input[name=legal-entity-business-tax-id]'),

  legalEntityFirstName: fillable('input[name=legal-entity-first-name]'),
  legalEntityLastName: fillable('input[name=legal-entity-last-name]'),

  birthDate,

  legalEntityAddressLine1: fillable('input[name=legal-entity-address-1]'),
  legalEntityAddressLine2: fillable('input[name=legal-entity-address-2]'),
  legalEntityAddressCity: fillable('input[name=legal-entity-address-city]'),
  state,
  legalEntityAddressPostalCode: fillable('input[name=legal-entity-address-postal-code]'),
  country,

  legalEntitySsnLast4: fillable('input[name=legal-entity-ssn-last-4]'),

  clickSubmit: clickable('input[type=submit]')
};
