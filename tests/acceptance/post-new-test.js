import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance: Post New', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('A post can be successfully created', (assert) => {
  assert.expect(8);

  let user = server.schema.user.create({ username: 'test_user' });

  let member = server.schema.member.create({ slug: 'test_organization' });
  let organization = member.createModel({ slug: 'test_organization' }, 'organization');
  member.save();
  let project = organization.createProject({ slug: 'test_project' });
  organization.save();

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.posts.new', 'Button takes us to the proper route');
    fillIn('[name=title]', 'A post title');
    fillIn('[name=markdown]', 'A post body');
    fillIn('[name=type]', 'Task');
    click('[name=submit]');
  });

  server.post('/posts', (db, request) => {
    let requestBody = JSON.parse(request.requestBody);

    let attributes = requestBody.data.attributes;

    assert.equal(attributes.title, 'A post title');
    assert.equal(attributes.markdown, 'A post body');
    assert.equal(attributes.post_type, 'task');

    let relationships = requestBody.data.relationships;

    assert.ok(relationships.user, 'A user relationship is contained within the request');
    assert.equal(relationships.user.data.id, user.id, 'The user relationship has the correct id');
    assert.ok(relationships.project, 'A project relationship is contained within the request');
    assert.equal(relationships.project.data.id, project.id, 'The project relationship has the correct id');

    return {
      data: {
        id: 1,
        type: "posts",
        attributes: attributes,
        relationships: relationships
      }
    };
  });
});

test('When post creation fails due to validation, validation errors are displayed', (assert) => {
  assert.expect(1);

  let user = server.schema.user.create({ username: 'test_user' });

  let member = server.schema.member.create({ slug: 'test_organization' });
  let organization = member.createModel({ slug: 'test_organization' }, 'organization');
  member.save();
  organization.createProject({ slug: 'test_project' });
  organization.save();

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    let postCreationDone = assert.async();
    server.post('/posts', () => {
      postCreationDone();
      return new Mirage.Response(422, {}, {
        errors: [
          {
            id: "VALIDATION_ERROR",
            source: { pointer:"data/attributes/title" },
            detail:"is invalid",
            status: 422
          },
          {
            id:"VALIDATION_ERROR",
            source: { pointer:"data/attributes/markdown" },
            detail: "can't be blank",
            status: 422
          },
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/post_type" },
            detail: "is invalid",
            status: 422
          },
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/post_type" },
            detail: "can only be one of the specified values",
            status: 422
          }
      ]});
    });
    click('[name=submit]');
  });

  andThen(() => {
    assert.equal(find('.error').length, 4);
  });
});

test('When post creation fails due to non-validation issues, the error is displayed', (assert) => {
  assert.expect(2);

  let user = server.schema.user.create({ username: 'test_user' });

  let member = server.schema.member.create({ slug: 'test_organization' });
  let organization = member.createModel({ slug: 'test_organization' }, 'organization');
  member.save();
  organization.createProject({ slug: 'test_project' });
  organization.save();

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    let postCreationDone = assert.async();
    server.post('/posts', () => {
      postCreationDone();
      return new Mirage.Response(400, {}, {
        errors: [
          {
            id: "UNKNOWN ERROR",
            title: "An unknown error",
            detail:"Something happened",
            status: 400
          }
        ]
      });
    });
    click('[name=submit]');
  });

  andThen(() => {
    assert.equal(find('.error').length, 1);
    assert.equal(find('.error').text(), 'Adapter operation failed');
  });
});
