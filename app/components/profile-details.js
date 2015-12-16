import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['profile-details'],
  classNameBindings: ['isEditing:edit'],

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    cancel() {
      var component = this;
      this.get('user').rollback().then(function() {
        component.set('isEditing', false);
      });
    },

    save() {
      var component = this;
      this.get('user').save().then(function() {
        component.set('isEditing', false);
      });
    },
  }
});
