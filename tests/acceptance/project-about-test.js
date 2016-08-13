import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Project - About', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('When unauthenticated, and project has no long description, it shows proper UI', (assert) => {
  assert.expect(2);

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let projectWithoutDescription = server.create('project', {
    longDescriptionBody: null,
    longDescriptionMarkdown: null,
    organization: organization
  });

  let urlForProjectWithoutDescription = `${sluggedRoute.slug}/${projectWithoutDescription.slug}`;

  visit(urlForProjectWithoutDescription);

  andThen(() => {
    assert.equal(find('.long-description.empty').length, 1, 'The empty container is shown');
    assert.equal(find('.editor-with-preview').length, 0, 'User is not logged in, so they cannot edit the description');
  });
});

test('When unauthenticated, and project has long description, it shows the project long description', (assert) => {
  assert.expect(2);

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let projectWithDescription = server.create('project', {
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body',
    organization: organization
  });

  let urlForProjectWithDescription = `${sluggedRoute.slug}/${projectWithDescription.slug}`;

  andThen(() => {
    visit(urlForProjectWithDescription);
  });

  andThen(() => {
    assert.ok(find('.long-description').text().trim().indexOf(projectWithDescription.longDescriptionBody) !== -1, 'The body is rendered');
    assert.equal(find('button[name=edit]').length, 0, 'User is not logged in, so they cannot edit the description');
  });
});

test('When authenticated as admin, and project has no long description, it allows setting it', (assert) => {
  assert.expect(4);

  let user = server.create('user');

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  server.create('organization-membership', { organization: organization, member: user, role: 'admin' });

  let projectWithoutDescription = server.create('project', {
    longDescriptionBody: null,
    longDescriptionMarkdown: null,
    organization: organization
  });

  let urlForProjectWithoutDescription = `${sluggedRoute.slug}/${projectWithoutDescription.slug}`;

  authenticateSession(application, { user_id: user.id });

  visit(urlForProjectWithoutDescription);

  andThen(() => {
    fillIn('textarea', 'A new body');
    click('button[name=save]');
  });

  andThen(() => {
    projectWithoutDescription.reload();
    assert.equal(projectWithoutDescription.longDescriptionMarkdown, 'A new body');
    assert.equal(projectWithoutDescription.longDescriptionBody, '<p>A new body</p>');
    assert.ok(find('.long-description').html().trim().indexOf(projectWithoutDescription.longDescriptionBody) !== -1, 'The body is rendered');
    assert.equal(find('button[name=edit]').length, 1, 'We can edit the description further');
  });
});

test('When authenticated as admin, and project has long description, it allows editing it', (assert) => {
  assert.expect(4);

  let user = server.create('user');

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  server.create('organization-membership', { organization: organization, member: user, role: 'admin' });

  let projectWithDescription = server.create('project', {
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body',
    organization: organization
  });

  let urlForProjectWithDescription = `${sluggedRoute.slug}/${projectWithDescription.slug}`;

  authenticateSession(application, { user_id: user.id });

  andThen(() => {
    visit(urlForProjectWithDescription);
  });

  andThen(() => {
    click('button[name=edit]');
    fillIn('textarea', 'An edited body');
    click('button[name=save]');
  });

  andThen(() => {
    projectWithDescription.reload();
    assert.equal(projectWithDescription.longDescriptionMarkdown, 'An edited body');
    assert.equal(projectWithDescription.longDescriptionBody, '<p>An edited body</p>');
    assert.ok(find('.long-description').html().trim().indexOf(projectWithDescription.longDescriptionBody) !== -1, 'The body is rendered');
    assert.equal(find('button[name=edit]').length, 1, 'We can edit the description further');
  });
});
