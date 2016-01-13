import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Integration: Project', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('It renders all the required ui elements', function(assert) {
  assert.expect(3);

  let posts = server.createList('post', 5);
  let project = server.create('project', { slug: 'test_project', posts: posts });
  let user = server.create('user', { username: 'test_user', projects: [project] });
  server.create('member', { slug: 'test_user', model: user });

  visit('/test_user/test_project');

  andThen(function() {
    assert.equal(find('.project-details').length, 1, 'project-details component is rendered');
    assert.equal(find('.project-post-list').length, 1, 'project-post-list component is rendered');
    assert.equal(find('.project-post-list .post').length, 5, 'correct number of posts is rendered');
  });
});
