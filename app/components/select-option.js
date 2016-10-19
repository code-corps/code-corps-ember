import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  attributeBindings: ['value', 'selected'],
  tagName: 'option',

  label: computed('optionLabelPath', 'item', function() {
    let label = this.get('optionLabelPath');
    return label && this.get(`item.${label}`);
  }),

  selected: computed('item', 'selectedItem', function() {
    return this.get('item') === this.get('selectedItem');
  }),

  value: computed('optionValuePath', 'item', function() {
    let value = this.get('optionValuePath');
    return value && this.get(`item.${value}`);
  })
});
