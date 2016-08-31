import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Post Editing', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Post editing requires logging in', (assert) => {
  assert.expect(4);

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let user = server.schema.users.create({ username: 'test_user' });
  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });
  post.user = user;
  post.save();

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.post-body .edit').length, 0, 'Body edit button is not rendered');
    assert.equal(find('.post-title .edit').length, 0, 'Title edit button is not rendered');

    authenticateSession(application, { user_id: user.id });
    visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);
  });

  andThen(() => {
    assert.equal(find('.post-body .edit').length, 1, 'Body edit button is rendered after authenticating');
    assert.equal(find('.post-title .edit').length, 1, 'Title edit button is rendered after authenticating');
  });
});

test('A post body can be edited on its own', (assert) => {
  assert.expect(3);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });
  post.user = user;
  post.save();

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-body .edit');
  });

  andThen(() => {
    fillIn('textarea[name=markdown]', 'Some type of markdown');
    click('.preview');
  });

  andThen(() => {
    assert.equal(find('.body-preview').html(), '<p>Some type of markdown</p>', 'The preview renders');
    click('.save');
  });

  andThen(() => {
    assert.equal(find('.post-body .edit').length, 1, 'Succesful save of body switches away from edit mode');
    assert.equal(find('.post-body .comment-body').html(), '<p>Some type of markdown</p>', 'The new post body is rendered');
  });
});

test('A post title can be edited on its own', (assert) => {
  assert.expect(4);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });
  post.user = user;
  post.save();

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-title .edit');
  });

  andThen(() => {
    assert.equal(find('.post-title input[name=title]').val(), 'Test title', 'The original title is correct');
    fillIn('.post-title input[name=title]', 'Edited title');
    click('.post-title .save');
  });

  andThen(() => {
    assert.equal(find('.post-title .edit').length, 1, 'Sucessful save of title switches away from edit mode');
    assert.equal(find('.post-title .title').text().trim(), 'Edited title #1', 'The new title is rendered');
    assert.equal(server.schema.posts.find(post.id).title, 'Edited title', 'The title was updated in the database');
  });
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*
test('Mentions are rendered during editing in preview mode', (assert) => {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({
    title: "Test title",
    body: "Test body",
    postType: "issue",
    number: 1
  });
  post.user = user;
  post.save();

  let user1 = server.create('user');
  let user2 = server.create('user');
  let markdown = `Mentioning @${user1.username} and @${user2.username}`;
  let expectedBody = `<p>Mentioning <a href="/${user1.username}" class="username">@${user1.username}</a> and <a href="/${user2.username}" class="username">@${user2.username}</a></p>`;

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-body .edit');
  });

  andThen(() => {
    fillIn('.post-body textarea', markdown);
    click('.preview');
  });

  andThen(() => {
    assert.equal(find('.body-preview').html(), expectedBody, 'The mentions render');
  });
});
*/

test('A post can be opened or closed by the author', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let project = server.create('project', { organization: organization });

  let post = server.schema.create('post', {
    type: 'issue',
    status: 'open',
    number: 1,
    user: user,
    project: project
  });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-status-button [name=close]');
  });

  andThen(() => {
    post.reload();
    assert.equal(post.status, 'closed');
    click('.post-status-button [name=open]');
  });

  andThen(() => {
    post.reload();
    assert.equal(post.status, 'open');
  });
});

test('A post can be opened or closed by the organization admin', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let project = server.create('project', { organization: organization });

  let post = server.schema.create('post', {
    type: 'issue',
    status: 'open',
    number: 1,
    project: project
  });

  server.schema.create('organization-membership', { organization: organization, member:  user, role: 'admin' });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-status-button [name=close]');
  });

  andThen(() => {
    post.reload();
    assert.equal(post.status, 'closed');
    click('.post-status-button [name=open]');
  });

  andThen(() => {
    post.reload();
    assert.equal(post.status, 'open');
  });
});

test('A post cannot be opened or closed by someone else', (assert) => {
  assert.expect(1);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let project = server.create('project', { organization: organization });

  let post = server.schema.create('post', {
    type: 'issue',
    status: 'open',
    number: 1,
    project: project
  });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.post-status-button [name=close]').length, 0, 'The close button is not rendered');
  });
});
