import Ember from 'ember';

const {
  Component,
  set
} = Ember;

/**
 * `related-skills` renders a list of associated skill records for an entity
 *
 * - For projects, this is `project.projectSkills`
 * - For tasks, this is `task.taskSkills`
 *
 * ## default usage
 *
 * ```handlebars
 * {{related-skills skills=parent.xSkills}}
 * ```
 *
 * @class related-skills
 * @module Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['related-skills'],

  isClickable: false,

  /**
   * Returns whether or not the overflowing skills on the project card should be
   * displayed.
   *
   * @property overflowHidden
   * @type Boolean
   * @default true
   */
  overflowHidden: true,

  /**
    Returns whether or not the toggle for showing overflowing skills should be
    visible or not.

    @property showToggle
    @type Boolean
    @default false
   */
  showToggle: false,

  actions: {

    /**
      Action that hides the overflowing skills.

      @method showLess
     */
    showLess() {
      set(this, 'overflowHidden', true);
    },

    /**
      Action that shows the overflowing skills.

      @method showMore
     */
    showMore() {
      set(this, 'overflowHidden', false);
    },

    /**
      Action that enables the overflow skills toggle. The skills self calculate
      if they are overflowing. If there is an overflow, this action is called
      and the toggle is shown; hiding the overflowing skills by default.

      @method skillItemHidden
     */
    skillItemHidden() {
      set(this, 'showToggle', true);
    }
  }
});
