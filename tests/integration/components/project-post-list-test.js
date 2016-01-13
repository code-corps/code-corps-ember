import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-post-list', 'Integration | Component | project post list', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{project-post-list}}`);

  assert.equal(this.$('.project-post-list').length, 1);
});

function generatePosts(ideaCount, progressCount, taskCount, issueCount) {
  let posts = [];

  for (let i = 0; i < ideaCount || 0; i++) {
    posts.push({ title: `Idea ${i}`, postType: 'idea' });
  }

  for (let i = 0; i < progressCount || 0; i++) {
    posts.push({ title: `Progress ${i}`, postType: 'progress'});
  }

  for (let i = 0; i < taskCount || 0; i++) {
    posts.push({ title: `Task ${i}`, postType: 'task'});
  }

  for (let i = 0; i < issueCount || 0; i++) {
    posts.push({ title: `Issue ${i}`, postType: 'issue'});
  }

  return posts;
}

test('it renders each post in the list if no filter is set', function(assert) {
  let posts = generatePosts(1, 1, 1, 1);
  this.set('posts', posts);

  this.render(hbs`{{project-post-list posts=posts}}`);

  assert.equal(this.$('.post').length, 4, 'Total number of posts is correct');
  assert.equal(this.$('.post.idea').length, 1, 'Total number of ideas is correct');
  assert.equal(this.$('.post.progress').length, 1, 'Total number of progress posts is correct');
  assert.equal(this.$('.post.task').length, 1, 'Total number of tasks is correct');
  assert.equal(this.$('.post.issue').length, 1, 'Total number of issues is correct');
});

test('it renders each post in the list if no filter is set', function(assert) {
  let posts = generatePosts(1, 1, 1, 1);
  this.set('posts', posts);

  this.render(hbs`{{project-post-list posts=posts}}`);

  this.$('.filter-ideas').click();

  assert.equal(this.$('.post').length, 1, 'Total number of posts is correct');
  assert.equal(this.$('.post.idea').length, 1, 'Total number of ideas is correct');
  assert.equal(this.$('.post.progress').length, 0, 'Total number of progress posts is correct');
  assert.equal(this.$('.post.task').length, 0, 'Total number of tasks is correct');
  assert.equal(this.$('.post.issue').length, 0, 'Total number of issues is correct');

  this.$('.filter-progress-posts').click();

  assert.equal(this.$('.post').length, 1, 'Total number of posts is correct');
  assert.equal(this.$('.post.idea').length, 0, 'Total number of ideas is correct');
  assert.equal(this.$('.post.progress').length, 1, 'Total number of progress posts is correct');
  assert.equal(this.$('.post.task').length, 0, 'Total number of tasks is correct');
  assert.equal(this.$('.post.issue').length, 0, 'Total number of issues is correct');

  this.$('.filter-tasks').click();

  assert.equal(this.$('.post').length, 1, 'Total number of posts is correct');
  assert.equal(this.$('.post.idea').length, 0, 'Total number of ideas is correct');
  assert.equal(this.$('.post.progress').length, 0, 'Total number of progress posts is correct');
  assert.equal(this.$('.post.task').length, 1, 'Total number of tasks is correct');
  assert.equal(this.$('.post.issue').length, 0, 'Total number of issues is correct');


  this.$('.filter-issues').click();

  assert.equal(this.$('.post').length, 1, 'Total number of posts is correct');
  assert.equal(this.$('.post.idea').length, 0, 'Total number of ideas is correct');
  assert.equal(this.$('.post.progress').length, 0, 'Total number of progress posts is correct');
  assert.equal(this.$('.post.task').length, 0, 'Total number of tasks is correct');
  assert.equal(this.$('.post.issue').length, 1, 'Total number of issues is correct');

});
