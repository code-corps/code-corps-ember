import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';

function createProject(slug) {
  slug = slug || 'test_organization';

  // server.create uses factories. server.schema.<obj>.create does not
  let project = server.create('project');

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create<<<<<<< HEAD
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();

  return project;
}

moduleForAcceptance('Acceptance | projects');

test('visiting /projects', function(assert) {
  let project = createProject();

  let skill = server.create('skill', {
    title: 'Ruby'
  });

  server.create('project-skill', {
    project: project,
    skill: skill,
  });

  project.skills = [skill];
  project.save();

  visit('/projects');

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});
