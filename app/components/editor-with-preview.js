import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNames: ['editor-with-preview'],
  classNameBindings: ['mode'],
  mode: null,
  previewedOnce: false,
  textareaFocused: false,

  editing: Ember.computed.equal('mode', 'editing'),
  previewing: Ember.computed.equal('mode', 'previewing'),
  shouldFocus: Ember.computed.or('autofocus', 'previewedOnce'),

  didInitAttrs() {
    this._super(...arguments);
    this.mode = 'editing';
    this.previewedOnce = false;
  },

  didRender() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, 'attemptFocus');
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if(!this.get('isLoading')) {
      this.resetHeight();
    }
  },

  attemptFocus() {
    if(this.get('shouldFocus')) {
      this.focusTextarea();
    }
  },

  createPreview() {
    let content = this.get('input');
    this.sendAction('generatePreview', content);
  },

  focusTextarea() {
    this.$('textarea').focus();
    this.set('textareaFocused', true);
  },

  handleEdit() {
    this.resetHeight();
    this.set('mode', 'editing');
  },

  handlePreview() {
    this.setHeight();
    this.set('mode', 'previewing');
    this.set('previewedOnce', true);
    this.createPreview();
  },

  resetHeight() {
    this.set('height', null);
  },

  setHeight() {
    let height = this.$().css('height');
    this.set('height', height);
  },

  style: Ember.computed('height', function() {
    let height = this.get('height');
    if(height) {
      let css = "min-height: " + height + ";";
      return new Ember.Handlebars.SafeString(css);
    }
  }),

  actions: {
    blurTextarea() {
      this.set('textareaFocused', false);
    },

    edit() {
      this.handleEdit();
    },

    preview() {
      this.handlePreview();
    },
  }
});
