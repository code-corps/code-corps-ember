import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance: Post Creation', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Creating a post requires logging in', (assert) => {
  assert.expect(2);

  // server.create uses factories. server.schema.<obj>.create does not
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let organization = sluggedRoute.createOwner({slug: 'test_organization'}, 'Organization');
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
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

test('A post can be successfully created', (assert) => {
  assert.expect(8);

  let user = server.schema.user.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
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
    fillIn('[name=post-type]', 'task');
    click('[name=submit]');
  });

  andThen(() => {
    assert.equal(server.schema.post.all().length, 1, 'A post has been created');

    let post = server.schema.post.all()[0];

    assert.equal(post.title, 'A post title');
    assert.equal(post.markdown, 'A post body');
    assert.equal(post.postType, 'task');

    assert.equal(post.userId, user.id, 'The correct user was assigned');
    assert.equal(post.projectId, project.id, 'The correct project was assigned');

    assert.equal(currentRouteName(), 'project.posts.post', 'We got redirected to the post route');
  });

  // TODO: Make sure we got redirected to the post route and post is properly rendered
});

test('Post preview works during creation', (assert) => {
  assert.expect(1);

  let user = server.schema.user.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project/posts/new');

  andThen(() => {
    fillIn('textarea[name=markdown]', 'Some type of markdown');
    click('.preview');
  });

  andThen(() => {
    assert.equal(find('.post-new-form .body-preview').html(), '<p>Some type of markdown</p>', 'The preview is rendered');
  });
});

test('When post creation succeeeds, the user is redirected to the post page for the new post', (assert) => {
  assert.expect(2);

  let user = server.schema.user.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
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
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
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
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
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
