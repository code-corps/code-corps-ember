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
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    assert.equal(find('.post-body .edit').length, 0, 'Body edit button is not rendered');
    assert.equal(find('.post-title .edit').length, 0, 'Title edit button is not rendered');

    let user = server.schema.user.create({ username: 'test_user' });
    authenticateSession(application, { user_id: user.id });
    visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);
  });

  andThen(() => {
    assert.equal(find('.post-body .edit').length, 1, 'Body edit button is rendered after authenticating');
    assert.equal(find('.post-title .edit').length, 1, 'Title edit button is rendered after authenticating');
  });
});

test('A post body can be edited on it\'s own', (assert) => {
  assert.expect(3);

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

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
    assert.equal(find('.post-body .body').html(), '<p>Some type of markdown</p>', 'The new post body is rendered');
  });
});

test('A post title can be edited on it\'s own', (assert) => {
  assert.expect(3);

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({ title: "Test title", body: "Test body", postType: "issue", number: 1 });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-title .edit');
    fillIn('.post-title input[name=title]', 'Edited title');
    click('.post-title .save');
  });

  andThen(() => {
    assert.equal(find('.post-title .edit').length, 1, 'Sucessful save of title switches away from edit mode');
    assert.equal(find('.post-title .title').text().trim(), 'Edited title', 'The new title is rendered');
    assert.equal(server.schema.post.find(post.id).title, 'Edited title', 'The title was updated in the database');
  });
});

test('Mentions are rendered during editing in preview mode', (assert) => {
  assert.expect(1);

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization', ownerType: 'organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  let project = server.schema.project.find(projectId);
  project.organization = organization;
  project.save();

  let post = project.createPost({
    title: "Test title",
    body: "Test body",
    postType: "issue",
    number: 1
  });

  let user1 = server.create('user', { username: 'user1' });
  let user2 = server.create('user', { username: 'user2' });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-body .edit');
  });

  andThen(() => {
    fillIn('.post-body textarea', 'Mentioning @user1 and @user2');
    click('.preview');
  });

  andThen(() => {
    let expectedOutput = `<p>Mentioning <a href="/users/${user1.id}">@user1</a> and <a href="/users/${user2.id}">@user2</a></p>`;
    assert.equal(find('.body-preview').html(), expectedOutput, 'The mentions render');
  });
});
