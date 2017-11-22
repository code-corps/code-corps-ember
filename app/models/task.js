import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import ContainsCodeMixin from '../mixins/contains-code';

/**
  Task is a (issue/idea/task) created by a user for a project.

  @class task
  @module Model
  @extends Ember.Model
 */
export default Model.extend(ContainsCodeMixin, {
  archived: attr(),
  body: attr(),
  createdAt: attr('date'),
  createdFrom: attr(),
  hasGithubPullRequest: attr(),
  markdown: attr(),
  number: attr('number'),
  order: attr(),
  overallStatus: attr(),
  status: attr(),
  title: attr(),
  updatedAt: attr('date'),

  /**
    Position is a virtual (write-only) attribute used to compute the `order` of the task by the server.
   */
  position: attr(),

  /**
    The comments that belong to the task

    @attribute comments
    @type Ember.computed
   */
  comments: hasMany('comment', { async: true }),

  /**
    The comment user mentions that belong to the task

    @attribute commentUserMentions
    @type Ember.computed
   */
  commentUserMentions: hasMany('comment-user-mention', { async: true }),

  /**
   * The GitHub issue synced with this task
   *
   * @attribute githubIssue
   * @type DS.Model
   */
  githubIssue: belongsTo('github-issue', { async: true }),

  /**
   * The GitHub pull request synced with this task
   *
   * @attribute githubPullRequest
   * @type DS.Model
   */
  githubPullRequest: belongsTo('github-pull-request', { async: true }),

  /**
   * The github repository where an issue connected to this task exists
   *
   * @attribute githubRepo
   * @type DS.Model
   */
  githubRepo: belongsTo('github-repo', { async: true }),

  /**
    The task-list that the task belongs to

    @attribute task-list
    @type Ember.computed
   */
  taskList: belongsTo('task-list', { async: true }),

  taskSkills: hasMany('task-skill', { async: true }),

  /**
    The task user mentions that belong to the task.

    @attribute taskUserMentions
    @type Ember.computed
   */
  taskUserMentions: hasMany('task-user-mention', { asnyc: true }),

  /**
    The project that the task belongs to

    @attribute project
    @type Ember.computed
   */
  project: belongsTo('project', { async: true }),

  /**
    The user that the task belongs to

    @attribute user
    @type Ember.computed
   */
  user: belongsTo('user', { async: true }),

  /**
    The user task relationshipp

    @attribute userTask
    @type Ember.computed
   */
  userTask: belongsTo('user-task', { async: true })
});
