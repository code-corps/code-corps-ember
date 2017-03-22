import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['preset-amount'],
  classNameBindings: ['presetAmount', 'selected:default:clear'],
  tagName: 'button',
  presetAmount: 0
});
