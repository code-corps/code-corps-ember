import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['profile-details'],
  classNameBindings: ['isEditing:edit'],

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    cancel() {
      this.set('isEditing', false);
    }
  }
});
