import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['member-details'],

  isOrganization: Ember.computed('member.model', function() {
    var model = this.get('member.model');
    if (model) {
      return model.constructor.modelName === 'organization';
    }
  }),

  isUser: Ember.computed('member.model', function() {
    var model = this.get('member.model');
    if (model) {
      return model.constructor.modelName === 'user';
    }
  }),
});
