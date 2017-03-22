import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import projectsPage from '../pages/projects';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | Projects');

test('visiting /projects', function(assert) {
  let project = server.create('project');

  let skill = server.create('skill', {
    title: 'Ruby'
  });

  server.create('project-skill', { project, skill });

  project.skills = [skill];
  project.save();

  projectsPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});

test('members are displayed correctly', function(assert) {
  let project = server.create('project');
  server.createList('project-user', 10, {
    role: 'contributor',
    project
  });

  projectsPage.visit();
  andThen(() => {
    assert.equal(projectsPage.projects(0).members().count, 8, '8 members are rendered');
    assert.equal(projectsPage.projects(0).memberCount.text, '+2 more', 'The "+2 more" text is rendered');
  });
});

test('an authenticated user can quicly join a project', function(assert) {
  assert.expect(1);

  let projectId = server.create('project').id;
  let userId = server.create('user').id;
  authenticateSession(this.application, { 'user_id': userId });

  projectsPage.visit();

  andThen(() => {
    projectsPage.projects(0).projectJoinModal.openButton.click();
    projectsPage.projects(0).projectJoinModal.modal.joinProjectButton.click();
  });

  andThen(() => {
    let membership = server.schema.projectUsers.findBy({ userId, projectId, role: 'pending' });
    assert.ok(membership, 'Project membership was created correctly.');
  });
});
