import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['error-wrapper', 'center-pseudo'],

  background: Ember.inject.service(),

  errorClass: Ember.computed('is404', function() {
    if(this.get('is404')) {
      return 'warning';
    } else {
      return 'danger';
    }
  }),

 // Map the HTTP status codes into an array or
  // an empty array if there are no such status codes
  httpStatusCodes: Ember.computed('model', function() {
    let model = this.get('model');
    if (model && model.hasOwnProperty('errors')) {
      let errors = model.errors;
      return errors.map(function(err) {
        return err.status;
      });
    } else {
      return [];
    }
  }),

  is404: Ember.computed('httpStatusCodes', function() {
    return this.get('httpStatusCodes').contains(404);
  }),

  observeErrorClass: Ember.observer('errorClass', function() {
    this.updateBackground();
  }),

  didRender() {
    this.updateBackground();
  },

  willDestroyElement() {
    this.get('background').reset();
  },

  updateBackground() {
    this.set('background.class', this.get('errorClass'));
    this.get('background').updateBackgroundClass();
  },
});
