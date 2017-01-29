import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  attributeBindings: ['value', 'selected'],
  tagName: 'option',

  label: computed('optionLabelPath', 'item', function() {
    let label = get(this, 'optionLabelPath');
    return label && this.get(`item.${label}`);
  }),

  selected: computed('item', 'selectedItem', function() {
    return get(this, 'item') === get(this, 'selectedItem');
  }),

  value: computed('optionValuePath', 'item', function() {
    let value = get(this, 'optionValuePath');
    return value && this.get(`item.${value}`);
  })
});
