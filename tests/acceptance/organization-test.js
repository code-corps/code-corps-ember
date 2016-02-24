import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Organization', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("it displays the organization's details", (assert) => {
  assert.expect(7);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  for (let i = 1; i <= 3; i++) {
    organization.createProject({
      slug: `test_project_${i}`,
      title: `Test project ${i}`
    });

    organization.createUser({
      username: `username_${i}`
    });
  }
  organization.save();

  visit(organization.slug);
  andThen(() => {
    assert.equal(find('.organization-details').length, 1, "The organization details component renders");
    assert.equal(find('.project-list').length, 1, "The projects list component renders");
    assert.equal(find('.organization-members').length, 1, "The organization members component renders");
    assert.equal(find('h2').text().trim(), "Test Organization", "The organization title renders");
    assert.equal(find('.organization-details p').text().trim(), "Test organization description.", "The organization description renders");
    assert.equal(find('.project-list .project-item').length, 3, "The projects render");
    assert.equal(find('.organization-members li').length, 3, "The members render");
  });
});