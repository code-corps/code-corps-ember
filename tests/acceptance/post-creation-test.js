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
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization', ownerType: 'organization' });
  let organization = sluggedRoute.createOwner({slug: 'test_organization'}, 'Organization');
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  visit('/test_organization/test_project/posts');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    server.schema.users.create({ id: 1, email: 'josh@coderly.com' });
    fillIn('#identification', 'josh@coderly.com');
    fillIn('#password', 'password');
    click('#login');
  });

  andThen(() => {
    assert.equal(currentURL(), '/test_organization/test_project/posts/new');
  });
});

test('A post can be successfully created', (assert) => {
  assert.expect(9);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  visit('/test_organization/test_project/posts');

  andThen(() => {
    click('.new-post');
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.posts.new', 'Button takes us to the proper route');
    assert.equal(find('[name=post-type]').val(), 'issue', 'Has the right default post type');
    fillIn('[name=title]', 'A post title');
    fillIn('[name=markdown]', 'A post body');
    fillIn('[name=post-type]', 'idea');
    click('[name=submit]');
  });

  andThen(() => {
    assert.equal(server.schema.posts.all().models.length, 1, 'A post has been created');

    let post = server.schema.posts.all().models[0];

    assert.equal(post.title, 'A post title');
    assert.equal(post.markdown, 'A post body');
    assert.equal(post.postType, 'idea');

    assert.equal(post.userId, user.id, 'The correct user was assigned');
    assert.equal(post.projectId, project.id, 'The correct project was assigned');

    assert.equal(currentRouteName(), 'project.posts.post', 'We got redirected to the post route');
  });

  // TODO: Make sure we got redirected to the post route and post is properly rendered
});

test('Post preview works during creation', (assert) => {
  assert.expect(1);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
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

test('Post preview during creation renders user mentions', (assert) => {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let organization = server.create('organization');
  let sluggedRoute = server.create('sluggedRoute', { slug: organization.slug, ownerType: 'organization' });
  let project = server.create('project');

  sluggedRoute.owner = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();

  let user1 = server.create('user');
  let user2 = server.create('user');
  let markdown = `Mentioning @${user1.username} and @${user2.username}`;
  let expectedBody = `<p>Mentioning <a href="/${user1.username}" class="username">@${user1.username}</a> and <a href="/${user2.username}" class="username">@${user2.username}</a></p>`;

  visit(`/${organization.slug}/${project.slug}/posts/new`);

  andThen(() => {
    fillIn('textarea[name=markdown]', markdown);
    click('.preview');
  });

  andThen(() => {
    assert.equal(find('.body-preview').html(), expectedBody, 'The mentions render');
  });
});

test('When post creation succeeeds, the user is redirected to the post page for the new post', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
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
    assert.equal(server.schema.posts.all().models.length, 1, 'A new post got created');
  });
});

test('When post creation fails due to validation, validation errors are displayed', (assert) => {
  assert.expect(1);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
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

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
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
    assert.equal(find('.error').text().trim(), 'An unknown error: Something happened', 'The error is messaged');
  });
});
