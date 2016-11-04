import { clickable, fillable, isVisible, value } from 'ember-cli-page-object';

import donationAmountButtonComponent from './donation-amount-button';
import Ember from 'ember';

const { $: { extend } } = Ember;

export default {
  scope: '.create-donation',

  rendersSetCustomField: isVisible('input[name=amount]'),
  rendersContinueButton: isVisible('button.continue'),

  clickContinue: clickable('button.continue'),

  customAmount: fillable('input[name=amount]'),
  customAmountValue: value('input[name=amount]'),

  // first argument is target object, to which all other object's properties are added
  setTo10: extend({}, donationAmountButtonComponent, { scope: '.preset-amount.10' }),
  setTo15: extend({}, donationAmountButtonComponent, { scope: '.preset-amount.15' }),
  setTo25: extend({}, donationAmountButtonComponent, { scope: '.preset-amount.25' }),
  setTo50: extend({}, donationAmountButtonComponent, { scope: '.preset-amount.50' })
};
