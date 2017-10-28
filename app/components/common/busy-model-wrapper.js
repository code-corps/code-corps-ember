import Component from '@ember/component';

export default Component.extend({
  tagName:'',
  model: null,

  onSaving: 'Saving...',
  onDeleting: 'Deleting...'
});
