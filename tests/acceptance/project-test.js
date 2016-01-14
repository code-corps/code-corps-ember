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

test('It renders all the required ui elements', function(assert) {
  assert.expect(3);

  let member = server.schema.member.create({ slug: 'test_user', modelType: 'user' });
  let user = member.createUser({ username: 'test_user' });
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
