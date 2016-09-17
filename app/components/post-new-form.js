import Ember from 'ember';

/**
  The post-new-form component is used for creating new posts. It includes the
  post type, title, editor and preview

  ## default usage

  ```handlebars
  {{post-new-form post=newPost savePost='savePostMethod'}}
  ```

  @class post-new-form
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-new-form'],
  classNameBindings: ['post.postType'],
  tagName: 'form',

  /**
    @property credentials
    @type Ember.Service
   */
  credentials: Ember.inject.service(),

  /**
    Holds the placeholder messages for each post type: task, issue, idea.

    @property placeholders
    @type Object
   */
  placeholders: {
    task: "How can you describe the steps to complete the task so anyone can work on it?",
    issue: "What issue needs resolved? If it's a bug, how can anyone reproduce it?",
    idea: "What's your idea? Be specific so people can give more accurate feedback.",
  },

  /**
    Returns which placeholder message to use from the placeholders property
    based on the post type.

    @property placeholder
    @type String
   */
  placeholder: Ember.computed('post.postType', function() {
    let postType = this.get('post.postType');
    if (postType) {
      return this.get(`placeholders.$(postType)`);
    }
  }),

  actions: {

    /**
      Action that is fired on form submit. Sends the `savePost` action that
      was passed into the component.

      @method submit
     */
    submit() {
      let post = this.get('post');
      this.sendAction('savePost', post);
    },
  },
});
