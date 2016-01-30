import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['error-wrapper'],
  statuses: Ember.computed('model', function() {
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
  isNotFound: Ember.computed('statuses', function() {
    return this.get('statuses').contains(404);
  })
});
