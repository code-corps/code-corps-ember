import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('post-new-form', 'Integration | Component | post new form', {
  integration: true,
  beforeEach() {
    this.register('service:credentials', Ember.Service.extend({ currentUserMembership: null }));
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{post-new-form}}`);

  assert.equal(this.$('.post-new-form').length, 1, 'The component\'s element renders');
});

test('it renders proper ui elements, properly bound', function(assert) {
  assert.expect(8);

  let post = {
    title: 'A post',
    markdown: 'A body',
    postType: 'idea'
  };

  let placeholder = "Test placeholder";

  this.set('post', post);
  this.set('placeholder', placeholder);
  this.render(hbs`{{post-new-form post=post placeholder=placeholder}}`);

  assert.equal(this.$('[name=title]').val(), 'A post', 'Title is properly bound and rendered');
  assert.equal(this.$('[name=markdown]').val(), 'A body', 'Markdown content is properly bound and rendered');
  assert.equal(this.$('[name=post-type]').val(), 'idea', 'Post type is properly bound and rendered');
  assert.equal(this.$('textarea').attr('placeholder'), placeholder);
  assert.equal(this.$('.input-group.post-type').hasClass('idea'), true);
  assert.equal(this.$('input[name=submit]').hasClass('idea'), true);
  assert.equal(this.$('input[name=submit]').val(), 'Submit new idea');
  assert.equal(this.$('.editor-with-preview .spinner').length, 0);
});

test('it triggers an action when the post is saved', function(assert) {
  assert.expect(2);

  let post = Ember.Object.create({ id: 1 });

  this.set('post', post);
  this.on('savePost', (post) => {
    assert.ok(true, 'Action has been called');
    assert.equal(post.id, 1, 'Post parameter has been passed in');
  });

  this.render(hbs`{{post-new-form post=post savePost='savePost'}}`);

  this.$('[type=submit]').click();
});

test('it renders only idea and issue post type options if user is not at least a contributor to the organization', function(assert) {
  assert.expect(3);

  this.register('service:credentials', Ember.Service.extend({
    currentUserMembership: { isContributor: false, isAdmin: false, isOwner: false }
  }));

  this.render(hbs`{{post-new-form post=post placeholder=placeholder}}`);

  assert.equal(this.$('option[value=idea]').length, 1, 'idea option is rendered');
  assert.equal(this.$('option[value=issue]').length, 1, 'issue option is rendered');
  assert.equal(this.$('option[value=task]').length, 0, 'task option is rendered');
});

test('it renders all post type options if user is at least contributor', function(assert) {
  assert.expect(3);

  this.register('service:credentials', Ember.Service.extend({
    currentUserMembership: { isContributor: true }
  }));

  this.render(hbs`{{post-new-form post=post placeholder=placeholder}}`);

  assert.equal(this.$('option[value=idea]').length, 1, 'idea option is rendered');
  assert.equal(this.$('option[value=issue]').length, 1, 'issue option is rendered');
  assert.equal(this.$('option[value=task]').length, 1, 'task option is rendered');
});
