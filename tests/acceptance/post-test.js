import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance: Post', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Post details are displayed correctly', (assert) => {
  assert.expect(3);

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', modelType: 'organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.model = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.post-details .title').text().trim(), post.title);
    assert.equal(find('.post-details .body').text().trim(), post.body);
    assert.equal(find('.post-details .post-type').text().trim(), post.postType);
  });
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
    fillIn('[name=markdown]', 'Test markdown');
    click('[name=save]');
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

test('A post can be successfully created', (assert) => {
  assert.expect(8);

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

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project/posts');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.posts.new', 'Button takes us to the proper route');
    fillIn('[name=title]', 'A post title');
    fillIn('[name=markdown]', 'A post body');
    fillIn('[name=post-type]', 'Task');
    click('[name=submit]');
  });

  andThen(() => {
    assert.equal(server.schema.post.all().length, 1, 'A post has been created');

    let post = server.schema.post.all()[0];

    assert.equal(post.title, 'A post title');
    assert.equal(post.markdown, 'A post body');
    assert.equal(post.post_type, 'task');
    assert.equal(post.state, 'published', 'Post is set to published when save button is clicked');

    assert.equal(post.userId, user.id, 'The correct user was assigned');
    assert.equal(post.projectId, project.id, 'The correct project was assigned');
  });
});

test('When post creation succeeeds, the user is redirected to the post page for the new post', (assert) => {
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

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project/posts');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    fillIn('[name=title]', 'A post title');
    fillIn('[name=markdown]', 'A post body');
    fillIn('[name=post-type]', 'Task');
    click('[name=submit]');
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.posts.post', 'Got redirected to the correct route');
    assert.equal(server.schema.post.all().length, 1, 'A new post got created');
  });
});

test('When post creation fails due to validation, validation errors are displayed', (assert) => {
  assert.expect(1);

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

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project/posts');

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

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project/posts');

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

test('Creating a post requires logging in', (assert) => {
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

  visit('/test_organization/test_project/posts');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    server.schema.user.create({ id: 1, email: 'josh@coderly.com' });
    fillIn('#identification', 'josh@coderly.com');
    fillIn('#password', 'password');
    click('#login');
  });

  andThen(() => {
    assert.equal(currentURL(), '/test_organization/test_project/posts/new');
  });
});
