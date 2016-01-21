import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('project-post-new-form', 'Integration | Component | project post new form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{project-post-new-form}}`);

  assert.equal(this.$('.project-post-new-form').length, 1, 'The component\'s element renders');
});

test('it renders proper ui elements, properly bound', function(assert) {
  assert.expect(3);

  let post = {
    title: 'A post',
    markdown: 'A body',
    postType: 'task'
  };

  this.set('post', post);
  this.render(hbs`{{project-post-new-form post=post}}`);

  assert.equal(this.$('[name=title]').val(), 'A post', 'Title is properly bound and rendered');
  assert.equal(this.$('[name=markdown]').val(), 'A body', 'Markdown content is properly bound and rendered');
  assert.equal(this.$('[name=post-type]').val(), 'task', 'Post type is properly bound and rendered');
});


test('it triggers an action when the post is saved', function(assert) {
  assert.expect(2);

  let post = {
    save: () => { return Ember.RSVP.resolve({ id: 1 }); }
  };

  this.set('post', post);
  this.on('viewPost', (post) => {
    assert.ok(true, 'Actio has been called');
    assert.equal(post.id, 1, 'Post parameter has been passed in');
  });

  this.render(hbs`{{project-post-new-form post=post postSaved='viewPost'}}`);

  this.$('[type=submit]').click();
});
