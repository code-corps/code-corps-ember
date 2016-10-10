import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import organizationProjects from '../pages/organization-projects';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';

const { run } = Ember;

let application;

module('Acceptance: Organization projects', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('It renders all the required ui elements', (assert) => {
  assert.expect(3);

  let organization = createOrganizationWithSluggedRoute();
  let projects = server.createList('project', 5, { organization });

  organizationProjects.visit({ slug: organization.slug });

  andThen(function() {
    assert.ok(organizationProjects.project.isVisible, 'project-list component is rendered');
    assert.equal(organizationProjects.project.items().count, 5, 'correct number of project-items is rendered');

    let firstProjectHref = organizationProjects.project.items(0).href;
    assert.ok(firstProjectHref.indexOf(`/${organization.slug}/${projects[0].slug}`) > -1, 'The link to a project is properly rendered');
  });
});
