import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import taskPage from '../pages/project/tasks/task';

moduleForAcceptance('Acceptance | Task Skills');

test("it allows editing of task's skills", function(assert) {
  assert.expect(5);

  let done = assert.async();

  server.create('skill', {
    title: 'Ruby'
  });

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(this.application, { user_id: user.id });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  let task = project.createTask({ title: 'Test title', body: 'Test body', taskType: 'issue', number: 1 });
  task.user = user;
  task.save();

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    taskPage.skillsTypeahead.fillIn('ru');
  });

  andThen(() => {
    assert.equal(taskPage.skillsTypeahead.inputItems().count, 1);
    assert.equal(taskPage.skillsTypeahead.inputItems(0).text, 'Ruby');
    taskPage.skillsTypeahead.inputItems(0).click();
  });

  andThen(() => {
    assert.equal(taskPage.taskSkillsList().count, 1);
    assert.equal(taskPage.taskSkillsList(0).text, 'Ruby');
    taskPage.taskSkillsList(0).click();
  });

  andThen(() => {
    assert.equal(taskPage.taskSkillsList().count, 0);
    done();
  });
});
