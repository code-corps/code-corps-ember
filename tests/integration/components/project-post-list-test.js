import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-post-list', 'Integration | Component | project post list', {
  integration: true,
});

test('it renders', function(assert) {
  this.set('posts', []);

  this.render(hbs`{{project-post-list posts=posts}}`);

  assert.equal(this.$('.project-post-list').length, 1);
});

test('it renders a message if the post count is 0', function(assert) {
  this.set('posts', []);

  this.render(hbs`{{project-post-list posts=posts}}`);

  assert.equal(this.$('.empty').length, 1, 'The message is rendered');
  assert.equal(this.$('.empty .empty-icon.box-icon').length, 1, 'The icon is rendered');
  assert.equal(this.$('.empty h3').text().trim(), "Here's where the magic happens.");
  assert.equal(this.$('.empty button').text().trim(), "Create a post");
});

test('it renders a message if the post count is 0 and posts are filtered', function(assert) {
  this.set('posts', []);

  this.render(hbs`{{project-post-list posts=posts isFiltered=true}}`);

  assert.equal(this.$('.empty').length, 1, 'The message is rendered');
  assert.equal(this.$('.empty .empty-icon.search-icon').length, 1, 'The icon is rendered');
  assert.equal(this.$('.empty h3').text().trim(), 'Your filters look a little too specific.');
  assert.equal(this.$('.empty p').text().trim(), "We couldn't find any posts that match all your filters.");
});

test('it renders a post item for each post', function(assert) {
  const posts = [
    { id: 1, },
    { id: 2, },
    { id: 3, }
  ];
  this.set('posts', posts);

  this.render(hbs`{{project-post-list posts=posts}}`);

  assert.equal(this.$('.post-item').length, 3, 'The post items are rendered');
});



