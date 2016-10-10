import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['select-dropdown'],
  classNameBindings: ['selectedItem'],

  actions: {
    selectItem(item) {
      this.set('selectedItem', item);
    }
  }
});
