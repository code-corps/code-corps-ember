import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['create-donation'],
  presetAmounts: [10, 15, 25, 50],
  amount: 15
});
