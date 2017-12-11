import { get } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  metrics: service(),
  projectTaskBoard: service(),

  async model() {
    let project = this.modelFor('project');
    let projectUsers = await get(project, 'projectUsers');
    let userPromises = projectUsers.mapBy('user');
    let taskLists = get(project, 'taskLists');
    taskLists.forEach((taskList) => get(taskList, 'tasks').reload());
    return RSVP.hash({ project, users: RSVP.all(userPromises) });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  deactivate() {
    this._super(...arguments);
    get(this, 'projectTaskBoard').deactivate();
    return true;
  },

  actions: {
    didTransition() {
      this._super(...arguments);
      get(this, 'projectTaskBoard').activate();
      return true;
    },

    transitionToTask(task) {
      let project = get(task, 'project');
      let organizationSlug = get(project, 'organization.slug');
      let projectSlug = get(project, 'slug');
      let taskNumber = get(task, 'number');

      let organizationId = get(project, 'organization.id');
      let organizationName = get(project, 'organization.name');
      let projectId = get(project, 'id');
      let projectTitle = get(project, 'title');
      let taskId = get(task, 'id');
      let taskTitle = get(task, 'title');

      get(this, 'metrics').trackEvent({
        event: 'Clicked on Task Card in List',
        organization: organizationName,
        organization_id: organizationId,
        project: projectTitle,
        project_id: projectId,
        task: taskTitle,
        task_id: taskId
      });

      this.transitionTo('project.tasks.task', organizationSlug, projectSlug, taskNumber);
    }
  }
});
