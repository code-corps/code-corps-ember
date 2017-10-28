import Component from '@ember/component';

export default Component.extend({
  classNames: ['preset-amount'],
  classNameBindings: ['presetAmount', 'selected:default:clear'],
  tagName: 'button',
  presetAmount: 0
});
