import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import mockRouting from '../../helpers/mock-routing';

const {
  $,
  Object,
  Service
} = Ember;

let mockSession = Service.extend({
  isAuthenticated: true
});

let pressCtrlEnter = $.Event('keydown', {
  keyCode: 13,
  which: 13,
  ctrlKey: true
});

moduleForComponent('create-comment-form', 'Integration | Component | create comment form', {
  integration: true,
  setup() {
    mockRouting(this);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{create-comment-form}}`);
  assert.equal(this.$('form.create-comment-form').length, 1, 'The component\'s element is rendered');
});

test('it yelds to content', function(assert) {
  assert.expect(1);

  this.register('service:session', mockSession);

  this.render(hbs`{{#create-comment-form}}Random content{{/create-comment-form}}`);
  let componentTextContent = this.$('form.create-comment-form').text().trim();
  assert.ok(componentTextContent.indexOf('Random content') > -1, 'The provided content is yielded to');
});

test('it renders the proper elements', function(assert) {
  assert.expect(2);

  this.register('service:session', mockSession);

  this.set('comment', {});

  this.render(hbs`{{create-comment-form comment=comment}}`);
  assert.equal(this.$('.create-comment-form [name=markdown]').length, 1, 'The markdown input is rendered');
  assert.equal(this.$('.create-comment-form [name=save]').length, 1, 'The save button is rendered');
});

test('it calls action when user clicks submit', function(assert) {
  assert.expect(1);

  this.register('service:session', mockSession);

  this.set('comment', Object.create({ markdown: 'Test markdown' }));
  this.on('saveComment', (comment) => {
    assert.equal(comment.markdown, 'Test markdown', 'Action was called with proper parameter');
  });

  this.render(hbs`{{create-comment-form comment=comment saveComment='saveComment'}}`);
  this.$('[name=save]').click();
});

test('it calls action when user hits ctrl+enter', function(assert) {
  assert.expect(1);

  this.register('service:session', mockSession);

  this.set('comment', Object.create({ markdown: 'Test markdown' }));
  this.on('saveComment', (comment) => {
    assert.equal(comment.markdown, 'Test markdown', 'Action was called with proper parameter');
  });

  this.render(hbs`{{create-comment-form comment=comment saveComment='saveComment'}}`);
  this.$('textarea').trigger(pressCtrlEnter);
});

test('it renders a sign up button and sign in link when not authenticated', function(assert) {
  assert.expect(3);

  this.render(hbs`{{create-comment-form}}`);

  assert.equal(this.$('.comment-signup p').text().trim(), 'Sign up for free to comment on this conversation, or sign in.');
  assert.equal(this.$('.comment-signup a:first').attr('href'), '/signup');
  assert.equal(this.$('.comment-signup a:last').attr('href'), '/login');
});
