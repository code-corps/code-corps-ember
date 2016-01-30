import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['error-wrapper'],

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
  })
});
