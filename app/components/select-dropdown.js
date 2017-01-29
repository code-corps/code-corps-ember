import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  classNames: ['select-dropdown'],
  classNameBindings: ['selectedItem'],

  actions: {
    selectItem(item) {
      set(this, 'selectedItem', item);
    }
  }
});
