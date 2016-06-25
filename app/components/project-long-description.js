import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-long-description'],

  credentials: Ember.inject.service(),

  inEditMode: false,
  descriptionIsBlank: false,

  shouldDisplayEditor: Ember.computed.or('inEditMode', 'descriptionIsBlank'),

  didReceiveAttrs() {
    this._inferrIfAddingDescription();
    return this._super(...arguments);
  },

  actions: {
    edit() {
      this._enterEditMode();
    },

    cancel() {
      this._enterReadMode();
    },

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
    if (Ember.isPresent(this.get('project.longDescriptionBody'))) {
      this.set('descriptionIsBlank', false);
    } else {
      this.set('descriptionIsBlank', true);
    }
  }
});
