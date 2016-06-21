import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNames: ['editor-with-preview'],
  classNameBindings: ['mode'],
  mode: null,
  nothingToPreviewMessage: '<p>Nothing to preview.</p>',
  previewedOnce: false,
  textareaFocused: false,

  store: Ember.inject.service(),
  mentionFetcher: Ember.inject.service(),

  editing: Ember.computed.equal('mode', 'editing'),
  previewing: Ember.computed.equal('mode', 'previewing'),
  shouldFocus: Ember.computed.or('autofocus', 'previewedOnce'),

  style: Ember.computed('height', function() {
    let height = this.get('height');
    if(height) {
      let css = "min-height: " + height + ";";
      return new Ember.Handlebars.SafeString(css);
    }
  }),

  init() {
    this._super(...arguments);
    this.setProperties({ mode: 'editing', previewedOnce: false });
  },

  didRender() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, '_attemptFocus');
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if(!this.get('isLoading')) {
      this._resetHeight();
    }
  },

  actions: {
    blurTextarea() {
      this.set('textareaFocused', false);
    },

    edit() {
      this._handleEdit();
    },

    preview() {
      this._handlePreview();
    },
  },

  _handleEdit() {
    this._resetHeight();
    this.set('mode', 'editing');
  },

  _handlePreview() {
    this._setHeight();
    this.set('mode', 'previewing');
    this.set('previewedOnce', true);
    this._fetchPreview();
  },

  _fetchPreview() {
    this.set('fetchingPreview', true);

    let markdown = this.get('input');
    this.set('preview', '');

    if (Ember.isEmpty(markdown)) {
      this.set('preview', this.get('nothingToPreviewMessage'));
      this.set('fetchingPreview', true);
    } else {
      let preview = this.get('store').createRecord('preview', { markdown: markdown });
      preview.save().then((preview) => {
        this.get('mentionFetcher').fetchBodyWithMentions(preview, 'preview').then((body) => {
          this.set('preview', body);
          this.set('fetchingPreview', false);
        });
      });
    }
  },

  _setHeight() {
    let height = this.$().css('height');
    this.set('height', height);
  },

  _resetHeight() {
    this.set('height', null);
  },

  _attemptFocus() {
    if(this.get('shouldFocus')) {
      this._focusTextarea();
    }
  },

  _focusTextarea() {
    this.$('textarea').focus();
    this.set('textareaFocused', true);
  },
});
