import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import mockRouting from '../../helpers/mock-routing';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';

import createCommentForm from 'code-corps-ember/tests/pages/components/create-comment-form';

let page = PageObject.create(createCommentForm);

let mockSession = { isAuthenticated: true };

moduleForComponent('create-comment-form', 'Integration | Component | create comment form', {
  integration: true,
  setup() {
    mockRouting(this);
  },
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it yields to content', function(assert) {
  assert.expect(1);

  stubService(this, 'session', mockSession);
  set(this, 'onSave', () => {});

  this.render(hbs`
    {{#create-comment-form comment=comment save=onSave}}
      Random content
    {{/create-comment-form}}
  `);

  assert.ok(page.contains('Random content'), 'The provided content is yielded to');
});

test('it renders the proper elements', function(assert) {
  assert.expect(2);

  stubService(this, 'session', mockSession);

  set(this, 'comment', {});
  set(this, 'onSave', () => {});

  this.render(hbs`{{create-comment-form comment=comment save=onSave}}`);

  assert.ok(page.rendersMarkdown, 'The markdown input is rendered');
  assert.ok(page.rendersSaveButton, 'The save button is rendered');
});

test('it calls action when user clicks submit', function(assert) {
  assert.expect(1);

  stubService(this, 'session', mockSession);

  set(this, 'comment', { markdown: 'Test markdown' });
  set(this, 'onSave', (markdown) => {
    assert.equal(markdown, 'Test markdown', 'Action was called with proper parameter');
  });

  this.render(hbs`{{create-comment-form comment=comment save=onSave}}`);

  page.clickSave();
});

test('it renders a sign up button and sign in link when not authenticated', function(assert) {
  assert.expect(2);

  set(this, 'onSave', () => {});

  this.render(hbs`{{create-comment-form comment=comment save=onSave}}`);

  assert.ok(page.rendersSignup, 'Sign up link is rendered');
  assert.ok(page.rendersLogin, 'Login ink is rendered');
});
