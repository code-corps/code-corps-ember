import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';
import loginPage from '../pages/login';
import projectPostsPage from '../pages/project-posts';

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
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let organization = server.schema.organizations.create({slug: 'test_organization'});
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();
  projectPostsPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectPostsPage.clickNewPost();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    server.schema.users.create({ id: 1, email: 'josh@coderly.com' });
    loginPage.form.loginSuccessfully();
  });

  andThen(() => {
    assert.equal(currentURL(), `/${organization.slug}/${project.slug}/posts/new`);
  });
});

test('A post can be successfully created', (assert) => {
  assert.expect(9);
  let user = server.schema.users.create({ username: 'test_user' });

  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });
  projectPostsPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectPostsPage.clickNewPost();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.posts.new', 'Button takes us to the proper route');
    assert.equal(find('[name=post-type]').val(), 'issue', 'Has the right default post type');
    projectPostsPage.postTitle('A post title').postMarkdown('A post body').postType('idea').clickSubmit();
  });

  andThen(() => {
    assert.equal(server.schema.posts.all().models.length, 1, 'A post has been created');

    let post = server.schema.posts.all().models[0];

    assert.equal(post.title, 'A post title');
    assert.equal(post.markdown, 'A post body');
    console.log(post);
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
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectPostsPage.visitNew({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectPostsPage.postMarkdown('Some type of markdown');
    projectPostsPage.clickPreviewPost();
  });

  andThen(() => {
    assert.equal(projectPostsPage.previewBody.text, 'Some type of markdown', 'The preview is rendered');
  });
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*test('Post preview during creation renders user mentions', (assert) => {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let organization = server.create('organization');
  let sluggedRoute = server.create('sluggedRoute', { slug: organization.slug });
  let project = server.create('project');

  sluggedRoute.organization = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();

  let user1 = server.create('user');
  let user2 = server.create('user');
  let markdown = `Mentioning @${user1.username} and @${user2.username}`;
  const expectedBody = `Mentioning @${user1.username} and @${user2.username}`;
  projectPostsPage.visitNew({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectPostsPage.postMarkdown(markdown);
    projectPostsPage.clickPreviewPost();

    andThen(() => {
      assert.equal(projectPostsPage.previewBody.text, expectedBody, 'The mentions render');
    });
  });
});*/

test('When post creation succeeeds, the user is redirected to the post page for the new post', (assert) => {
  assert.expect(2);
  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectPostsPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => projectPostsPage.clickNewPost());

  andThen(() => {
    projectPostsPage.postTitle('A post title').postMarkdown('A post body').postType('Task').clickSubmit();
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
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectPostsPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => projectPostsPage.clickNewPost());

  andThen(() => {
    let postCreationDone = assert.async();
    server.post('/posts', function() {
      postCreationDone();
      return new Mirage.Response(422, {}, {
        errors: [
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/title" },
            detail:"is invalid",
            status: 422
          },
          {
            id:"VALIDATION_ERROR",
            source: { pointer: "data/attributes/markdown" },
            detail: "can't be blank",
            status: 422
          },
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/post-type" },
            detail: "is invalid",
            status: 422
          },
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/post-type" },
            detail: "can only be one of the specified values",
            status: 422
          }
      ]});
    });
    projectPostsPage.clickSubmit();
  });

  andThen(() => assert.equal(projectPostsPage.errors().count, 4));
});

test('When post creation fails due to non-validation issues, the error is displayed', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectPostsPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectPostsPage.clickNewPost();
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
    projectPostsPage.clickSubmit();
  });

  andThen(() => {
    assert.equal(projectPostsPage.errors().count, 1);
    assert.equal(projectPostsPage.errors().contains('An unknown error: Something happened', 'The error is messaged'), true);
  });
});
