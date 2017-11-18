import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import page from '../pages/project/tasks/index';
import Service from '@ember/service';

moduleForAcceptance('Acceptance | Task List');

function createContributor(project) {
  return createUserWithRole(project, 'contributor');
}

function createUserWithRole(project, role) {
  let user = server.create('user');
  server.create('project-user', { user, project, role });
  return user;
}

test('member can assign/reassign/unassign tasks to user', function(assert) {
  assert.expect(7);

  let project = server.create('project');

  let currentUser = createContributor(project);
  let taskList = server.create('task-list', { project });
  server.create('task', { project, taskList });

  let otherUsers = server.createList('user', 5);
  otherUsers.forEach((user) => {
    server.create('project-user', { user, project, role: 'contributor' });
  });

  authenticateSession(this.application, { user_id: currentUser.id });

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  let taskCard;

  andThen(() => {
    // We need to hover the card to be able to assign the task
    // NOTE: mouseenter doesn't trigger in the page object
    find('.task-card:eq(0)').mouseenter();
  });

  andThen(() => {
    taskCard = page.taskBoard.taskLists(0).taskCards(0);
    assert.ok(taskCard.taskAssignment.select.trigger.unassigned, 'Task is rendered unassigned.');
    taskCard.mouseenter();
    taskCard.triggerKeyDown('Space');
  });

  andThen(() => {
    // assert assignment went through
    assert.ok(taskCard.taskAssignment.select.trigger.assigned, 'Task is rendered assigned.');
    let userTask = server.schema.userTasks.first();
    assert.equal(userTask.user.photoThumbUrl, taskCard.taskAssignment.assignedUser.icon.url, 'Assigned user is rendered.');
    taskCard.mouseenter();
    taskCard.triggerKeyDown('KeyA');
  });

  andThen(() => {
    taskCard.taskAssignment.select.dropdown.options(1).select();
  });

  andThen(() => {
    // assert reassignment went through
    assert.ok(taskCard.taskAssignment.select.trigger.assigned, 'Task is rendered assigned.');
    let userTask = server.schema.userTasks.first();
    assert.equal(userTask.user.photoThumbUrl, taskCard.taskAssignment.assignedUser.icon.url, 'Assigned user is rendered.');
    taskCard.taskAssignment.select.trigger.open();
  });

  andThen(() => {
    taskCard.taskAssignment.select.dropdown.options(1).select();
  });

  andThen(() => {
    // assert unassignment went through
    assert.equal(server.schema.userTasks.all().models.length, 0, 'The record was destroyed.');
    assert.ok(taskCard.taskAssignment.select.trigger.unassigned, 'Task is rendered unassigned.');
  });
});

test('clicking a task card is tracked', function(assert) {
  assert.expect(1);

  let project = server.create('project');
  let { organization } = project;

  let currentUser = createContributor(project);
  let taskList = server.create('task-list', { project });
  let task = server.create('task', { project, taskList });

  authenticateSession(this.application, { user_id: currentUser.id });

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  this.application.register('service:stubMetrics', Service.extend({
    instantiate: false,
    trackEvent(data) {
      assert.deepEqual(data, {
        event: 'Clicked on Task Card in List',
        organization: organization.name,
        organization_id: organization.id,
        project: project.title,
        project_id: project.id,
        task: task.title,
        task_id: task.id
      }, 'Event tracking was called with proper attributes.');
    }
  }));
  this.application.inject('route', 'metrics', 'service:stubMetrics');

  andThen(() => {
    page.taskBoard.taskLists(0).taskCards(0).title.click();
  });
});
