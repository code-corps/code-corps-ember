import Ember from 'ember';

const {
  computed,
} = Ember;

/**
  A badge that presents a post's status

  ## default usage

  ```handlebars
  {{post-status post=post}}
  ```

  @class post-status
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['post-status-badge'],

  status: computed.alias('post.status'),
});
