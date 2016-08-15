import Ember from 'ember';
import {
  equal,
  or,
} from 'ember-computed';

const {
  Component,
  computed,
  get,
  inject,
  isEmpty,
  set,
} = Ember;

const { service } = inject;

/**
  `editor-with-preview` composes the comment/post editor with the ability to
  preview the content.

  ## default usage

  ```Handlebars
  {{editor-with-preview
    input=comment.markdown
    isLoading=comment.isSaving
    modifiedSubmit="save"}}
  ```

  @class editor-with-preview
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  attributeBindings: ['style'],
  classNames: ['editor-with-preview'],
  classNameBindings: ['mode'],

  /**
    The mode that the editor is in. (example: 'preview', 'editing')

    @property mode
    @type String
   */
  mode: null,

  /**
    The default message that is shown when previewing empty content.

    @property nothingToPreviewMessage
    @type String
   */
  nothingToPreviewMessage: '<p>Nothing to preview.</p>',

  /**
    Returns `true` if the content has been previewed more than once.

    @property previewedOnce
    @type Boolean
   */
  previewedOnce: false,

  /**
    Returns if the text area is in focus.

    @property textareaFocused
    @type Boolean
   */
  textareaFocused: false,

  /**
    @property store
    @type Ember.Service
   */
  store: service(),

  /**
    @property mentionFetcher
    @type Ember.Service
   */
  mentionFetcher: service(),


  /**
    Returns if the editor is in editing mode.

    @property editing
    @type Boolean
   */
  editing: equal('mode', 'editing'),

  /**
    Returns if the editor is in preview mode.

    @property previewing
    @type Boolean
   */
  previewing: equal('mode', 'previewing'),

  /**
    Returns true if the `autofocus` or `previewedOnce` properties are true.

    @property shouldFocus
    @type Boolean
   */
  shouldFocus: or('autofocus', 'previewedOnce'),

  /**
    The style attribute for the `editor-with-preview` component

    @property style
    @type String
   */
  style: computed('height', function() {
    const height = get(this, 'height');

    if (height) {
      const css = "min-height: " + height + ";";
      return new Ember.Handlebars.SafeString(css);
    }
  }),

  /**
    Sets the `mode` property to 'editing' and the `previewedOnce` property to
    `false` on init.

    @method init
   */
  init() {
    this._super(...arguments);
    this.setProperties({ mode: 'editing', previewedOnce: false });
  },

  /**
    Attempts to focus the textarea after the component has rendered.

    @method didRender
   */
  didRender() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, '_attemptFocus');
  },

  /**
    After updating the attributes on a rerender, this resets the height
    if the `isLoading` property is `false`.

    @method didUpdateAttrs
   */
  didUpdateAttrs() {
    this._super(...arguments);
    if (!get(this, 'isLoading')) {
      this._resetHeight();
    }
  },

  actions: {

    /**
      Action that sets the `textareaFocused` property to `false`.

      @method blurTextarea
     */
    blurTextarea() {
      set(this, 'textareaFocused', false);
    },

    /**
      Action that resets the editor height and sets the `mode` property to
      `editing`

      @method edit
     */
    edit() {
      this._resetHeight();
      set(this, 'mode', 'editing');
    },

    /**
      Action that forwards the `modifiedSubmit` action.

      @method modifiedSubmit
     */
    modifiedSubmit() {
      this.sendAction('modifiedSubmit');
    },

    /**
      Action that prepares and previews the contents of the editor.

      @method preview
     */
    preview() {
      this._setHeight();
      set(this, 'mode', 'previewing');
      set(this, 'previewedOnce', true);
      this._fetchPreview();
    },
  },

  _fetchPreview() {
    set(this, 'fetchingPreview', true);

    let markdown = this.get('input');
    set(this, 'preview', '');

    if (isEmpty(markdown)) {
      set(this, 'preview', this.get('nothingToPreviewMessage'));
      set(this, 'fetchingPreview', false);
    } else {
      let preview = get(this, 'store').createRecord('preview', { markdown: markdown });
      preview.save().then((preview) => {
        this.get('mentionFetcher').fetchBodyWithMentions(preview, 'preview').then((body) => {
          set(this, 'preview', body);
          set(this, 'fetchingPreview', false);
        });
      });
    }
  },

  _setHeight() {
    let height = this.$().css('height');
    set(this, 'height', height);
  },

  _resetHeight() {
    set(this, 'height', null);
  },

  _attemptFocus() {
    if (get(this, 'shouldFocus')) {
      this._focusTextarea();
    }
  },

  _focusTextarea() {
    this.$('textarea').focus();
    set(this, 'textareaFocused', true);
  },
});
