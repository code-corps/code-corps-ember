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

  assert.equal(this.$('.no-posts').length, 1, 'The message is rendered');
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



