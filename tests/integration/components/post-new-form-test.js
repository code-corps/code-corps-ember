import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-new-form', 'Integration | Component | post new form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{post-new-form}}`);

  assert.equal(this.$('.post-new-form').length, 1, 'The component\'s element renders');
});

test('it renders proper ui elements, properly bound', function(assert) {
  assert.expect(3);

  let post = {
    title: 'A post',
    markdown: 'A body',
    postType: 'task'
  };

  this.set('post', post);
  this.render(hbs`{{post-new-form post=post}}`);

  assert.equal(this.$('[name=title]').val(), 'A post', 'Title is properly bound and rendered');
  assert.equal(this.$('[name=markdown]').val(), 'A body', 'Markdown content is properly bound and rendered');
  assert.equal(this.$('[name=post-type]').val(), 'task', 'Post type is properly bound and rendered');
});


test('it triggers an action when the post is saved', function(assert) {
  assert.expect(2);

  let post = { id: 1 };

  this.set('post', post);
  this.on('savePost', (post) => {
    assert.ok(true, 'Action has been called');
    assert.equal(post.id, 1, 'Post parameter has been passed in');
  });

  this.render(hbs`{{post-new-form post=post savePost='savePost'}}`);

  this.$('[type=submit]').click();
});