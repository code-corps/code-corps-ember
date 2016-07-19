import Ember from 'ember';

/**
  The post-comment-list component composes the list of comments for a post.

  ## default usage

  ```handlebars
  {{post-comment-list comments=comments}}
  ```

  @class post-comment-list
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-comment-list']
});
