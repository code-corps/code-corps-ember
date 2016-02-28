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
      this.set('newTitle', this.get('post.title'));
      this.set('isEditing', true);
    },

    save() {
      let component = this;
      let post = this.get('post');
      let newTitle = this.get('newTitle');

      post.set('title', newTitle);
      post.save().then(() => {
        component.set('isEditing', false);
      });
    },

    cancel() {
      this.set('isEditing', false);
    }
  }
});
