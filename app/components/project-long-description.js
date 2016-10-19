import Ember from 'ember';

const {
  Component,
  computed: { or },
  inject: { service },
  isPresent
} = Ember;

/**
  `project-long-description` displays and allows editing of the long
  description for the project.

  ## Default usage
  ```handlebars
    {{project-long-description project=project}}
  ```

  @module Component
  @extends Ember.Component
  @class project-long-description
 */

export default Component.extend({
  classNames: ['project-long-description'],

  /**
    A service that returns the users credentials.

    @property credentials
    @type Ember.Service
   */
  credentials: service(),

  /**
    Property that holds the edit mode status.

    @property inEditMode
    @type Boolean
   */
  inEditMode: false,

  /**
    Property that holds whether the project has a description or not.

    @property descriptionIsBlank
    @type Boolean
   */
  descriptionIsBlank: false,

  /**
    Returns whether the editor should be displayed or not based on having no
    description or being toggled into edit mode.

    @property shouldDisplayEditor
    @type Boolean
   */
  shouldDisplayEditor: or('inEditMode', 'descriptionIsBlank'),

  didReceiveAttrs() {
    this._inferrIfAddingDescription();
    return this._super(...arguments);
  },

  actions: {

    /**
      Action that toggles edit mode.

      @method edit
     */
    edit() {
      this._enterEditMode();
    },

    /**
      Action that leaves edit mode without saving changes.

      @method cancel
     */
    cancel() {
      this._enterReadMode();
    },

    /**
      Action that saves changes and leaves edit mode.

      @method save
     */
    save() {
      this.get('project').save().then(() => {
        this._enterReadMode();
        this._inferrIfAddingDescription();
      });
    }
  },

  _enterEditMode() {
    this.set('inEditMode', true);
  },

  _enterReadMode() {
    this.set('inEditMode', false);
  },

  _inferrIfAddingDescription() {
    if (isPresent(this.get('project.longDescriptionBody'))) {
      this.set('descriptionIsBlank', false);
    } else {
      this.set('descriptionIsBlank', true);
    }
  }
});
