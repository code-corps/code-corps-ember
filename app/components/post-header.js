import Ember from 'ember';

/**
  The post-header component represents the header of a post. It is composed of
  the post icon & title.

  ## default usage

  ```handlebars
  {{post-header post=post saveTitle="savePostTitleAction"}}
  ```

  @class post-header
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-header'],
  classNameBindings: ['post.postType']
});
