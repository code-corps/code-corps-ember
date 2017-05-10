import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

/**
 * A component holding a power-select dropdown, used to select a github
 * repository for a project.
 *
 * Expects a `project` and a `repositories` attribute to be provided.
 * `repositories` can be a promise.
 *
 * @class GithubRepositorySelectComponent
 * @module code-corps-ember/components/github-repository-select
 * @extends Ember.Component
 * @public
 */
export default Component.extend({
  classNames: ['github-repository-select'],

  /**
   * Assignable collection to be rendered as options in a dropdown. Can be
   * a promise. The power-select component will render a loading state for
   * that promise.
   *
   * @property repositories
   * @public
   */
  repositories: [],

  /**
   * Assignable property. A {DS.Model} should be assigned to it.
   * Used to determine if the component should be enabled/disabled and to
   * preselect an option in the dropdown.
   *
   * @property project
   * @public
   */
  project: null,

  /**
   * A computed property, returns an object from `repositories` which matches
   * `project.githubId`
   *
   * @property selectedRepository
   * @private
   */
  selectedRepository: computed('repositories', 'project.githubId', {
    get() {
      let githubId = get(this, 'project.githubId');
      let repositories = get(this, 'repositories');

      return repositories.find((repo) => {
        return get(repo, 'githubId') == githubId;
      });
    }
  }),

  /**
   * Default handler for the power-select change action.
   *
   * power-select requires some sort of function, so the usual `null` default
   * does not work.
   *
   * @method onRepoSelected
   * @public
   */
  onRepoSelected() {}
});
