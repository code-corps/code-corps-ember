import Component from '@ember/component';
import { alias, equal } from '@ember/object/computed';

/**
  A badge that presents a task's status

  ## default usage

  ```handlebars
  {{task-status task=task}}
  ```

  @class task-status
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-status-badge'],

  task: null,

  hasGithubPullRequest: alias('task.hasGithubPullRequest'),

  closed: equal('task.overallStatus', 'closed'),
  merged: equal('task.overallStatus', 'merged'),
  open: equal('task.overallStatus', 'open'),

  status: alias('task.overallStatus')
});
