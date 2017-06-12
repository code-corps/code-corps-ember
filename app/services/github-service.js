import AjaxService from 'ember-ajax/services/ajax';
import Ember from 'ember';

const {
  computed,
  computed: { alias },
  get,
  inject: { service }
} = Ember;

/**
 * A Github API client service, used to communicate with the github API and
 * interpret the returned data.
 *
 * @class GithubService
 * @module code-corps-ember/services/github-service
 * @extends EmberAjax.AjaxService
 * @uses CurrentUserService
 * @public
 */
export default AjaxService.extend({
  currentUser: service(),
  host: 'https://api.github.com/',

  authToken: alias('currentUser.user.githubAuthToken'),

  headers: computed('authToken', {
    get() {
      let authToken = get(this, 'authToken');
      return { 'Authorization': `token ${authToken}` };
    }
  }),

  /**
   * Retrieves a list of repositories for a user.
   *
   * Requires user to be connected to github, meaning the current user must have
   * a `githubAuthToken`.
   *
   * @method getRepositories
   * @return {Array}
   * @public
   */
  getRepositories() {
    return this.request('/user/repos')
               .then((data) => this._mapRepositories(data));
  },

  /**
   * Maps a repository list payload retrieved from github.
   *
   * @method _mapRepositories
   * @param {Array} githubData payload to map
   * @return {Array} The mapped payload
   * @private
   */
  _mapRepositories(githubData) {
    return githubData.map((githubRepo) => this._mapRepository(githubRepo));
  },

  /**
   * Maps a single github repository item retrieved from github.
   *
   * @method _mapRepository
   * @param {Object} githubData The object containing data for a single repo.
   * @return {Object} The mapped repo object.
   * @private
   */
  _mapRepository({ id, name }) {
    return { githubId: id, repositoryName: name };
  },

  /**
   * Retrieves a list of github issues for a project.
   *
   * The project must be connected to github.
   *
   * NOTE: In the current implementation, where a project connected to github
   * will simply have a github id, which is the id of a connected github
   * repository, we make use of an undocumented github API endpoint to retrive
   * a single repository: `GET /repositories/:id`.
   *
   * The documented endpoint to retrieve a repository is `GET /:owner/:repo`.
   *
   * We are forced to use this undocumented endpoint because the id is the only
   * thing we store, and the only way to retrieve issues is via the endpoint
   * `GET /:owner/:repo/issues`.
   *
   * @method getIssues
   * @param {DS.Model} project - The project to get a list of github issues for.
   * @return {Array}
   * @public
   */
  getIssues(project) {
    let repoGithubId = get(project, 'githubId');
    return this.request(`/repositories/${repoGithubId}`)
               .then((repo) => this._getIssuesForRepo(repo))
               .then((issues) => this._mapIssues(issues));
  },

  /**
   * Retrieves a list of issues for a github repository.
   *
   * @method _getIssuesForRepo
   * @param {Object} githubRepo Data for a github repo, retrieved from github.
   * @return {Promise} A promise for an ajax request
   * @private
   */
  _getIssuesForRepo({ owner: { login }, name }) {
    return this.request(`/${login}/${name}/issues`);
  },

  /**
   * Maps an issue list payload retrieved from github.
   *
   * @method _mapIssues
   * @param {Array} githubIssues An array of issues retrieved from github
   * @return {Array} An array of mapped issues
   * @private
   */
  _mapIssues(issues) {
    return issues.map((issueData) => this._mapIssue(issueData));
  },

  /**
   * Maps an issue payload retrieved from github
   *
   * @method _mapIssue
   * @param {Object} githubIsue An issue retrieved from github
   * @return {Object} A mapped issue
   * @private
   */
  _mapIssue({ id, title }) {
    return { githubId: id, issueName: title };
  }
});
