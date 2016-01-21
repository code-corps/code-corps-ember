import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Post New', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Creating a new post works', function(assert) {
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
