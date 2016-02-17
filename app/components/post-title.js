import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: ['post-title'],
  classNameBindings: ['isEditing:editing'],

  didInitAttrs() {
    this.setProperties({
      isEditing: false,
    });
  },

  actions: {
    edit() {
      this.set('newTitle', this.get('title'));
      this.set('isEditing', true);
    },

    save() {
      let newTitle = this.get('newTitle');
      this.sendAction('saveTitle', newTitle);
      this.set('isEditing', false);
    },

    cancel() {
      this.set('isEditing', false);
    }
  }
});
