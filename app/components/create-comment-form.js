import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

/**
  `create-comment-form` composes the comment form. The comment form allows for
  editing and previewing the contents of a comment.

  ## default usage

  ```handlebars
  {{create-comment-form comment=comment save=(action 'saveComment')}}
  ```

  @class create-comment-form
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['create-comment-form'],
  tagName: 'form',

  /**
   * The injected services/session service. Used to determine if there is a
   * signed in user.
   *
   * @property session
   * @type Ember.Service
   */
  session: service(),

  /**
   * didReceiveAttrs - Component lifecycle hook
   *
   * We use it to set the initial value of the markdown edit field.
   */
  didReceiveAttrs() {
    set(this, 'markdown', get(this, 'comment.markdown'));
  }
});
