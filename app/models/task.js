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

  /**
    The tasks body content.

    @attribute body
    @type string
   */
  body: attr(),

  /**
    The date that the task was inserted.

    @attribute insertedAt
    @type date
   */
  insertedAt: attr('date'),

  /**
    The tasks markdown content.

    @attribute markdown
    @type string
   */
  markdown: attr(),

  /**
    The tasks client facing number.

    @attribute number
    @type number
   */
  number: attr('number'),

  /**
    Order is a read-only attribute computed from the `position` attribute

    @attribute order
    @readonly
    @type number
   */
  order: attr(),

  /**
    The task's type (issue/task/idea/etc.)

    @attribute taskType
    @type string
   */
  taskType: attr(),

  /**
    The task's status (open/closed)

    @attribute status
    @type string
   */
  status: attr(),

  /**
    The task's title

    @attribute title
    @type string
   */
  title: attr(),

  /**
    Position is a virtual (write-only) attribute used to compute the `order` of the task

    @attribute position
    @virtual
    @type number
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
  commentUserMentions: hasMany('comment-user-mention', { asnyc: true }),

  /**
    The task-list that the task belongs to

    @attribute task-list
    @type Ember.computed
   */
  taskList: belongsTo('task-list', { async: true }),

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
  user: belongsTo('user', { async: true })
});
