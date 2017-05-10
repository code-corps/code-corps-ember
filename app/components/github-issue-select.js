import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

/**
 * A component holding a power-select dropdown, used to select a github
 * issue for a task.
 *
 * Expects a `task` and an `issues` attribute to be provided.
 * `issues` can be a promise.
 *
 * @class GithubIssueSelectComponent
 * @module code-corps-ember/components/github-issue-select
 * @extends Ember.Component
 * @public
 */
export default Component.extend({
  classNames: ['github-issue-select'],

  /**
   * Assignable collection to be rendered as options in a dropdown. Can be
   * a promise. The power-select component will render a loading state for
   * that promise.
   *
   * @property issues
   * @public
   */
  issues: [],

  /**
   * Assignable property. A {DS.Model} should be assigned to it.
   * Used to determine if the component should be enabled/disabled and to
   * preselect an option in the dropdown.
   *
   * @property task
   * @public
   */
  task: null,

  /**
   * A computed property, returns an object from `issues` which matches
   * `task.githubId`
   *
   * @property selectedIssue
   * @private
   */
  selectedIssue: computed('issues', 'task.githubId', {
    get() {
      let githubId = get(this, 'task.githubId');
      let issues = get(this, 'issues');

      return issues.find((issue) => {
        return get(issue, 'githubId') == githubId;
      });
    }
  }),

  /**
   * Default handler for the power-select change action.
   *
   * power-select requires some sort of function, so the usual `null` default
   * does not work.
   *
   * @method onIssueSelected
   * @public
   */
  onIssueSelected() {}
});
