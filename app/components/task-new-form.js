import { alias, and, empty, notEmpty } from '@ember/object/computed';
import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

/**
  The task-new-form component is used for creating new tasks. It includes
  the title, editor and preview

  ## default usage

  ```handlebars
  {{task-new-form task=newTask saveTask='saveTaskMethod'}}
  ```

  @class task-new-form
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-new-form'],
  tagName: 'form',

  currentUser: service(),

  githubRepos: null,

  hasGithubRepos: notEmpty('githubRepos'),
  showGithubConnectCallout: and('hasGithubRepos', 'userHasNotConnectedGithub'),
  user: alias('currentUser.user'),
  userHasNotConnectedGithub: empty('user.githubId'),

  /**
    Returns which placeholder message to use.

    @property placeholder
    @type String
   */
  placeholder: 'How can you describe the steps to complete the task so anyone can work on it?'
});
