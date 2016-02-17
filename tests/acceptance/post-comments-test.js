import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance: Post Comments', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Post comments are displayed correctly', (assert) => {
  assert.expect(1);

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  server.createList('comment', 4, { postId: post.id });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.post-comment-list .comment-item').length, 4, 'The correct number of post comments is rendered');
  });
});

test('A comment can be added to a post', (assert) => {
  assert.expect(6);
  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.create-comment-form').length, 1, 'The component for comment creation is rendered');
    fillIn('.create-comment-form [name=markdown]', 'Test markdown');
    click('.create-comment-form [name=save]');
  });

  andThen(() => {
    assert.equal(server.schema.comment.all().length, 1, 'A new comment was created');
    assert.equal($('.comment-item').length, 1, 'The comment is being rendered');
    let comment = server.schema.comment.all()[0];

    assert.equal(comment.markdown, 'Test markdown', 'New comment has the correct markdown');
    assert.equal(comment.postId, post.id, 'Correct post was assigned');
    assert.equal(comment.userId, user.id, 'Correct user was assigned');
  });
});

test('Comment preview works during creation', (assert) => {
  assert.expect(3);

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = server.schema.post.create({ projectId: project.id, number: 1 });

  visit(`${sluggedRoute.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    fillIn('.create-comment-form textarea[name=markdown]', 'Some type of markdown');

    click('.create-comment-form .preview');
    server.post(`/comments/`, (db, request) => {
      let params = JSON.parse(request.requestBody);
      let attributes = params.data.attributes;

      assert.deepEqual(Object.keys(attributes), ['markdown_preview', 'preview']);
      assert.equal(attributes.markdown_preview, 'Some type of markdown', 'Markdown preview was sent correctly');
      assert.equal(attributes.preview, true, 'Preview flag is correctly set to true');

      return {
        data: {
          id: 1,
          type: 'comments',
          attributes: {
            markdown_preview: 'Some type of markdown',
            body_preview: '<p>Some type of markdown</p>'
          },
          relationships: {
            post: { data: { id: post.id, type: 'posts' } }
          }
        }
      };
    });
  });
});

test('When comment creation fails due to validation, validation errors are displayed', (assert) => {
  assert.expect(1);
  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    // mirage doesn't handle relationships correctly for some reason, so we need to test
    // server request directly here.
    let creationDone = assert.async();
    server.post('/comments', () => {
      creationDone();
      return new Mirage.Response(422, {}, {
        errors: [
          {
            id: "VALIDATION_ERROR",
            source: { pointer:"data/attributes/markdown" },
            detail:"is invalid",
            status: 422
          },
          {
            id:"VALIDATION_ERROR",
            source: { pointer:"data/attributes/markdown" },
            detail: "can't be blank",
            status: 422
          }
      ]});

    });

    click('[name=save]');
  });

  andThen(() => {
    assert.equal(find('.create-comment-form .error').length, 2, 'Validation errors are rendered');
  });
});

test('When comment creation fails due to non-validation issues, the error is displayed', (assert) => {
  assert.expect(2);
  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    // mirage doesn't handle relationships correctly for some reason, so we need to test
    // server request directly here.
    let creationDone = assert.async();
    server.post('/comments', () => {
      creationDone();
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
    click('[name=save]');
  });

  andThen(() => {
    assert.equal(find('.error').length, 1);
    assert.equal(find('.error').text(), 'Adapter operation failed');
  });
});

test('A comment can only be edited by the author', (assert) => {
  assert.expect(2);

  let user = server.schema.user.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  server.createList('comment', 1, { postId: post.id, userId: user.id });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.comment-item .edit').length, 0, 'Edit link is not rendered when logged out');
    authenticateSession(application, { user_id: user.id });
    visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);
  });

  andThen(() => {
    assert.equal(find('.comment-item .edit').length, 1, 'Edit link is rendered when logged in');
  });
});

test('Comment editing with preview works', (assert) => {
  assert.expect(6);

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  server.createList('comment', 1, { postId: post.id, userId: user.id });

  let comment = server.schema.comment.all()[0];

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.comment-item .edit');
  });

  andThen(() => {
    fillIn('.comment-item [name=markdown]', 'Some type of markdown');

    let previewDone = assert.async();
    server.patch(`/comments/${comment.id}`, (db, request) => {
      let params = JSON.parse(request.requestBody);
      let attributes = params.data.attributes;

      assert.deepEqual(Object.keys(attributes), ['markdown_preview', 'preview']);
      assert.equal(attributes.markdown_preview, 'Some type of markdown', 'Markdown preview was sent correctly');
      assert.equal(attributes.preview, true, 'Preview flag is correctly set to true');

      previewDone();
      return {
        data: {
          id: comment.id,
          type: 'comments',
          attributes: {
            markdown_preview: 'Some type of markdown',
            body_preview: '<p>Some type of markdown</p>'
          },
          relationships: {
            poxt: { data: { id: post.id, type: 'projects' } }
          }
        }
      };
    });

    click('.comment-item .preview');
  });

  andThen(() => {
    server.patch(`/comments/${comment.id}`, (db, request) => {
      let params = JSON.parse(request.requestBody);
      let attributes = params.data.attributes;

      assert.deepEqual(Object.keys(attributes),
        ['markdown_preview', 'preview']);
      assert.equal(attributes.markdown_preview, 'Some type of markdown', 'Markdown preview was sent correctly');
      assert.equal(attributes.preview, false, 'Preview flag was correctly not set');

      return {
        data: {
          id: comment.id,
          type: 'comments',
          attributes: {
            markdown: 'Some type of markdown',
            body: '<p>Some type of markdown</p>',
            markdown_preview: 'Some type of markdown',
            body_preview: '<p>Some type of markdown</p>'
          },
          relationships: {
            post: { data: { id: post.id, type: 'posts' } }
          }
        }
      };
    });

    click('.comment-item .save');
  });
});
