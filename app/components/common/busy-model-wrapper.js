import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName:'',
  model: null,

  onSaving: 'Saving...',
  onDeleting: 'Deleting...'
});
