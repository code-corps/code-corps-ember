import Ember from 'ember';
import { parse } from 'code-corps-ember/utils/mention-parser';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: ['post-details'],
  classNameBindings: ['post.postType'],

  postBodyWithMentions: Ember.computed('post.body', function() {
    let post = this.get('post');
    if (Ember.isPresent(post)) {
      return parse(this.get('post.body'), this.get('post.postUserMentions'));
    } else {
      return "";
    }
  }),

  postBodyPreviewWithMentions: Ember.computed('post.bodyPreview', function() {
    let post = this.get('post');
    if (Ember.isPresent(post)) {
      return parse(this.get('post.bodyPreview'), this.get('post.postUserMentions'));
    } else {
      return "";
    }
  }),

  init() {
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
      post.save().then((post) => {
        console.log(post);
      });
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
