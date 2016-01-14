import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Project', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('It renders all the required ui elements', (assert) => {
  assert.expect(3);

  let member = server.schema.member.create({ slug: 'test_user' });
  let user = member.createModel({ username: 'test_user' }, 'user');
  member.save();
  let project = user.createProject({ slug: 'test_project' });
  user.save();
  for (let i = 0; i < 5; i++) {
    project.createPost();
  }

  project.save();

  visit('/test_user/test_project');

  andThen(function() {
    assert.equal(find('.project-details').length, 1, 'project-details component is rendered');
    assert.equal(find('.project-post-list').length, 1, 'project-post-list component is rendered');
    assert.equal(find('.project-post-list .post').length, 5, 'correct number of posts is rendered');
  });
});

test('Filtering works', (assert) => {
  assert.expect(5);

  let member = server.schema.member.create({ slug: 'test_user', modelType: 'user' });
  let user = member.createModel({ username: 'test_user' }, 'user');
  member.save();
  let project = user.createProject({ slug: 'test_project' });
  user.save();

  for (let i = 0; i < 2; i++) {
    project.createPost({postType: 'idea', title: 'An idea'});
  }

  for (let i = 0; i < 3; i++) {
    project.createPost({postType: 'progress', title: 'A progress post'});
  }

  for (let i = 0; i < 4; i++) {
    project.createPost({postType: 'task', title: 'A task' });
  }

  for (let i = 0; i < 5; i++) {
    project.createPost({postType: 'issue', title: 'An issue'});
  }

  project.save();

  visit('/test_user/test_project');

  andThen(() => {
    assert.equal(find('.project-post-list .post').length, 14, 'correct number of posts is rendered');
    click('.filter-ideas');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post.idea').length, 2, 'only ideas are rendered');
    click('.filter-progress-posts');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post.progress').length, 3, 'only progress posts are rendered');
    click('.filter-tasks');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post.task').length, 4, 'only tasks are rendered');
    click('.filter-issues');
  });

  andThen(() => {
    assert.equal(find('.project-post-list .post.issue').length, 5, 'only issues are rendered');
  });
});
