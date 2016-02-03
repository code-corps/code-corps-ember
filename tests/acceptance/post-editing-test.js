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
  assert.expect(6);

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
