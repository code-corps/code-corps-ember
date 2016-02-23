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
  assert.expect(7);

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

    let previewDone = assert.async();

    click('.preview');

    server.patch(`/posts/${post.id}`, (db, request) => {
      let params = JSON.parse(request.requestBody);
      let attributes = params.data.attributes;

      assert.deepEqual(Object.keys(attributes), ['markdown_preview', 'preview']);
      assert.equal(attributes.markdown_preview, 'Some type of markdown', 'Markdown preview was sent correctly');
      assert.equal(attributes.preview, true, 'Preview flag is correctly set to true');

      previewDone();
      return {
        data: {
          id: post.id,
          type: 'posts',
          attributes: {
            markdown_preview: 'Some type of markdown',
            body_preview: '<p>Some type of markdown</p>'
          },
          relationships: {
            project: { data: { id: project.id, type: 'projects' } }
          }
        }
      };
    });
  });

  andThen(() => {
    assert.equal(find('.body-preview').html(), '<p>Some type of markdown</p>', 'The preview renders');
    let saveDone = assert.async();
    server.patch(`/posts/${post.id}`, (db, request) => {
      let params = JSON.parse(request.requestBody);
      let attributes = params.data.attributes;

      assert.deepEqual(Object.keys(attributes),
        ['markdown_preview']);
      assert.equal(attributes.markdown_preview, 'Some type of markdown', 'Markdown preview was sent correctly');

      saveDone();
      return {
        data: {
          id: post.id,
          type: 'posts',
          attributes: {
            markdown: 'Some type of markdown',
            body: '<p>Some type of markdown</p>',
            markdown_preview: 'Some type of markdown',
            body_preview: '<p>Some type of markdown</p>'
          },
          relationships: {
            project: { data: { id: project.id, type: 'projects' } }
          }
        }
      };
    });

    click('.save');
  });

  andThen(() => {
    assert.equal(find('.post-body .edit').length, 1, 'Succesful save of body switches away from edit mode');
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

    let saveDone = assert.async();
    server.patch(`/posts/${post.id}`, (db, request) => {
      let params = JSON.parse(request.requestBody);
      let attributes = params.data.attributes;

      assert.deepEqual(Object.keys(attributes), ['title'], 'Only the title attribute is in the payload');
      assert.equal(attributes.title, 'Edited title', 'New title was sent correctly');

      saveDone();
      return {
        data: {
          id: post.id,
          type: 'posts',
          attributes: {
            title: attributes.title
          },
          relationships: {
            project: { data: { id: project.id, type: 'projects' } }
          }
        }
      };
    });

    click('.post-title .save');
  });

  andThen(() => {
    assert.equal(find('.post-title .edit').length, 1, 'Sucessful save of title switches away from edit mode');
  });
});

test('Mentions are rendered during editing in preview mode', (assert) => {
  assert.expect(1);

  let user = server.schema.user.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

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

  let post = project.createPost({
    title: "Test title",
    body: "Test body",
    postType: "issue",
    number: 1,
    postUserMentions: [
      { indices: [14, 19], user: { id: 1, username: 'user1' } },
      { indices: [25, 30], user: { id: 2, username: 'user2' } }
    ],
  });

  let user1 = server.create('user', { username: 'user1' });
  let user2 = server.create('user', { username: 'user2' });

  visit(`/${organization.slug}/${project.slug}/posts/${post.number}`);

  andThen(() => {
    click('.post-body .edit');
  });

  andThen(() => {

    fillIn('.post-body textarea', 'Mentioning @user1 and @user2');

    let previewDone = assert.async();

    click('.preview');

    server.patch(`/posts/${post.id}`, (db, request) => {
      previewDone();
      let requestBody = JSON.parse(request.requestBody);
      let attributes = requestBody.data.attributes;
      let bodyPreview = `<p>${attributes.markdown_preview}</p>`;
      return {
        data: {
          id: post.id,
          type: 'posts',
          attributes: Ember.merge(attributes, { body_preview: bodyPreview }),
          relationships: {
            project: { data: { id: project.id, type: 'projects' } },
            post_user_mentions: { data: [
              { id: 1, type: 'post_user_mentions' },
              { id: 2, type: 'post_user_mentions' }
            ] }
          },
        },
        included: [
          {
            id: 1,
            attributes: { indices: [14, 19], username: user1.username },
            relationships: {
              post: { data: { id: post.id, type: 'posts' } },
              user: { data: { id: user1.id, type: 'users' } }
            },
            type: 'post_user_mentions'
          },
          {
            id: 2,
            attributes: { indices: [25, 30], username: user2.username },
            relationships: {
              post: {data: {id: post.id, type: 'posts'}},
              user: {data: {id: user2.id, type: 'users'}}
            },
            type: 'post_user_mentions'
          },
        ]
      };
    });
  });

  andThen(() => {
    let expectedOutput = `<p>Mentioning <a href="/users/${user1.id}">@user1</a> and <a href="/users/${user2.id}">@user2</a></p>`;
    assert.equal(find('.body-preview').html(), expectedOutput, 'The mentions render');
  });
});
