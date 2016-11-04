import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['preset-amount'],
  classNameBindings: ['presetAmount', 'selected:default:clear'],
  tagName: 'button',

  selected: computed('presetAmount', 'selectedAmount', function() {
    let { presetAmount, selectedAmount } = this.getProperties('presetAmount', 'selectedAmount');
    return parseInt(presetAmount) === parseInt(selectedAmount);
  }),

  click() {
    let presetAmount = this.get('presetAmount');
    this.sendAction('action', presetAmount);
  }
});
