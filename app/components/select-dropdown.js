import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['select-dropdown'],
  classNameBindings: ['selectedItem'],

  actions: {
    selectItem(item) {
      this.set('selectedItem', item);
    },
  },
});
