import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

/**
  Task-list is a collection of categorized tasks that belong to a project.

  @class task-list
  @module Model
  @extends Ember.Model
 */
export default Model.extend({

  /**
    Task-lists name

    @attribute name
    @type string
   */
  name: attr(),

  /**
    Order is a read-only attribute computed from the `position` attribute

    @attribute order
    @readonly
    @type number
   */
  order: attr(),

  /**
    Position is a virtual (write-only) attribute used to compute the `order` of the task-list

    @attribute position
    @virtual
    @type number
   */
  position: attr(),

  /**
    The project that the task-list belongs to.

    @attribute project
    @type Ember.computed
   */
  project: belongsTo('project', { async: true }),

  /**
    The tasks that belong to the task-list.

    @attribute tasks
    @type Ember.computed
   */
  tasks: hasMany('task', { async: true })
});
