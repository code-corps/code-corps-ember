import Ember from 'ember';

/**
  The post-item component is used to present a post in the list of posts.

  ## default usage

  ```handlebars
  {{post-item post=post}}
  ```

  @class post-item
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-item'],
  classNameBindings: ['post.postType']
});
