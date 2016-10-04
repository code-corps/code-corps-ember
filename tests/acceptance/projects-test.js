import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';

moduleForAcceptance('Acceptance | Projects');

test('visiting /projects', function(assert) {
  let project = createProjectWithSluggedRoute();

  let skill = server.create('skill', {
    title: 'Ruby'
  });

  server.create('project-skill', { project, skill });

  project.skills = [skill];
  project.save();

  visit('/projects');

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});

test('members are displayed correctly', (assert) => {
  let project = createProjectWithSluggedRoute();
  let organization = project.organization;
  server.createList('organizationMembership', 10, {
    role: "contributor",
    organization
  });

  visit('/projects');
  andThen(() => {
    assert.equal(find('.icon.tiny.circle').length, 8, '8 members are rendered');
    assert.equal(find('.project-card-members .count').text().trim(), '+2 more', 'The "+2 more" text is rendered');
  });
});
