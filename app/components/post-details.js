import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: ['post-details'],
  classNameBindings: ['post.postType'],

  didInitAttrs() {
    this.set('isEditingBody', false);
    this.set('isEditingTitle', false);
    return this._super(...arguments);
  },

  actions: {
    editPostBody() {
      this.set('isEditingBody', true);
    },

    cancelEditingPostBody() {
      this.set('isEditingBody', false);
    },

    generatePreview(markdown) {
      let post = this.get('post');
      post.set('markdownPreview', markdown);
      post.set('preview', true);
      post.save();
    },

    savePostBody() {
      let component = this;
      let post = this.get('post');
      post.set('preview', false);
      post.save().then(() => {
        component.set('isEditingBody', false);
      });
    },

    savePostTitle(title) {
      let component = this;
      let post = this.get('post');
      post.set('title', title);
      post.save().then(() => {
        component.set('isEditingTitle', false);
      });
    }
  }
});
