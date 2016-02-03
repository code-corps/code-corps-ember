import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['editor-with-preview'],
  classNameBindings: ['mode'],

  mode: null,

  editing: Ember.computed.equal('mode', 'editing'),
  previewing: Ember.computed.equal('mode', 'previewing'),

  didInitAttrs() {
    this._super(...arguments);
    this.mode = 'editing';
  },

  actions: {
    preview() {
      this.set('mode', 'previewing');
      this.set('preview', 'Loading preview...');
      let content = this.get('input');
      this.sendAction('generatePreview', content);
    },

    edit() {
      this.set('mode', 'editing');
    }
  }
});
