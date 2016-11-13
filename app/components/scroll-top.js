import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  click() {
    window.scrollTo(0, 0);
  }
});
