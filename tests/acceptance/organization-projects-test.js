import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import organizationProjects from '../pages/organization-projects';

moduleForAcceptance('Acceptance | Organization projects');

test('It renders all the required ui elements', function(assert) {
  assert.expect(3);

  let organization = server.create('organization');
  let projects = server.createList('project', 5, { organization });

  organizationProjects.visit({ slug: organization.slug });

  andThen(function() {
    assert.ok(organizationProjects.project.isVisible, 'project-list component is rendered');
    assert.equal(organizationProjects.project.items().count, 5, 'correct number of project-items is rendered');

    let firstProjectHref = organizationProjects.project.items(0).href;
    assert.ok(firstProjectHref.indexOf(`/${organization.slug}/${projects[0].slug}`) > -1, 'The link to a project is properly rendered');
  });
});
