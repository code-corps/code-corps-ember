import Ember from 'ember';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

const {
  Controller,
  get,
  set
} = Ember;

export default Controller.extend({
  actions: {
    /**
     * saveTask - action
     *
     * Triggered when user clicks 'save' on the new task form.
     * Adds task to the correct task list, which is the inbox task list.
     * Saves task and, on success, transitions to the task route.
     * On failure, calls the save error handler.
     *
     * @param  {DS.Model} task The task to be saved.
     */
    async saveTask(task) {
      let project = get(task, 'project');
      let inboxTaskList = await this._getInboxTaskList(project);

      set(task, 'taskList', inboxTaskList);

      return task.save()
                 .then((task) => this.transitionToRoute('project.tasks.task', get(task, 'number')))
                 .catch((payload) => this._handleTaskSaveError(payload));
    }
  },

  /**
   * _getInboxTaskList - Private method
   *
   * Returns a promise, which, when resolved, holds the task list for the specified
   * project, which is marked as an inbox task list.
   * @param  {DS.Model} project The currently loaded project.
   * @return {DS.Model}         The inbox task list for the specified project.
   */
  async _getInboxTaskList(project) {
    let taskLists = await get(project, 'taskLists');
    let inboxes = taskLists.filterBy('inbox', true);

    return get(inboxes, 'firstObject');
  },

  /**
   * _handleTaskSaveError - Private function
   *
   * Sets the controller `error` property if the error payloed is anything other
   * than a validation error
   *
   * @param  {DS.AdapterError} payload     The payload to check.
   */
  _handleTaskSaveError(payload) {
    if (isNonValidationError(payload)) {
      set(this, 'error', payload);
    }
  }
});
