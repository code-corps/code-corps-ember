import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import projectsPage from '../pages/projects';

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
    assert.equal(projectsPage.projectCard.members().count, 8, '8 members are rendered');
    assert.equal(projectsPage.projectCard.memberCount.text, '+2 more', 'The "+2 more" text is rendered');
  });
});
