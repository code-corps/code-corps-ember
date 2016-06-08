import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['value','selected'],
  tagName: 'option',

  label: Ember.computed('optionLabelPath','item', function() {
    let label = this.get('optionLabelPath');
    return label && this.get(`item.${label}`);
  }),

  selected: Ember.computed('item','selectedItem', function() {
    return this.get('item') === this.get('selectedItem');
  }),

  value: Ember.computed('optionValuePath','item', function() {
    let value = this.get('optionValuePath');
    return value && this.get(`item.${value}`);
  }),
});
