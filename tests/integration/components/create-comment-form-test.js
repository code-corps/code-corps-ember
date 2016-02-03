import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('create-comment-form', 'Integration | Component | create comment form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{create-comment-form}}`);
  assert.equal(this.$('form.create-comment-form').length, 1, 'The component\'s element is rendered');
});

test('it renders the proper elements', function(assert) {
  assert.expect(2);

  this.set('comment', {});

  this.render(hbs`{{create-comment-form comment=comment}}`);
  assert.equal(this.$('.create-comment-form [name=markdown]').length, 1, 'The markdown input is rendered');
  assert.equal(this.$('.create-comment-form [name=save]').length, 1, 'The save button is rendered');
});

test('it calls action when user clicks submit', function(assert) {
  assert.expect(1);

  this.set('comment', Ember.Object.create({ markdown: 'Test markdown' }));
  this.on('saveComment', (comment) => {
    assert.equal(comment.markdown, 'Test markdown', 'Action was called with proper parameter');
  });

  this.render(hbs`{{create-comment-form comment=comment saveComment='saveComment'}}`);
  this.$('[name=save]').click();
});
