import Ember from 'ember';

export default Ember.Controller.extend({
  isOrganization: Ember.computed('model.model', function() {
    var model = this.get('model.model');
    return model.constructor.modelName === 'organization';
  }),

  isUser: Ember.computed('model.model', function() {
    var model = this.get('model.model');
    return model.constructor.modelName === 'user';
  }),
});
