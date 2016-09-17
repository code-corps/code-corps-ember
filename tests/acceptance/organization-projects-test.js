import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import organizationProjects from '../pages/organization-projects';

let application;

module('Acceptance: Organization projects', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('It renders all the required ui elements', (assert) => {
  assert.expect(3);

  let slug = 'test_organization';
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: slug });
  let organization = sluggedRoute.createOrganization({ slug: slug });
  sluggedRoute.save();
  for (let i = 0; i < 5; i++) {
    organization.createProject({
      slug: `test_project_${i}`,
      title: `Test project ${i}`
    });
  }
  organization.save();

  organizationProjects.visit({ slug });

  andThen(function() {
    assert.ok(organizationProjects.project.isVisible, 'project-list component is rendered');
    assert.equal(organizationProjects.project.items().count, 5, 'correct number of project-items is rendered');

    let firstProjectHref = organizationProjects.project.items(0).href;
    assert.ok(firstProjectHref.indexOf(`/${slug}/test_project_0`) > -1, 'The link to a project is properly rendered');
  });
});
