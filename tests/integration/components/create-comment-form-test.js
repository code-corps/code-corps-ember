import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import mockRouting from '../../helpers/mock-routing';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';

import createCommentForm from 'code-corps-ember/tests/pages/components/create-comment-form';

let page = PageObject.create(createCommentForm);

const {
  set,
  Object
} = Ember;

let mockSession = { isAuthenticated: true };

function renderPage() {
  page.render(hbs`{{create-comment-form comment=comment save=saveHandler}}`);
}

function setHandler(context, saveHandler = function() {}) {
  set(context, 'saveHandler', saveHandler);
}

moduleForComponent('create-comment-form', 'Integration | Component | create comment form', {
  integration: true,
  setup() {
    mockRouting(this);
  },
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it yields to content', function(assert) {
  assert.expect(1);

  stubService(this, 'session', mockSession);

  page.render(hbs`{{#create-comment-form comment=comment save=saveHandler}}Random content{{/create-comment-form}}`);
  assert.ok(page.contains('Random content'), 'The provided content is yielded to');
});

test('it renders the proper elements', function(assert) {
  assert.expect(2);

  stubService(this, 'session', mockSession);

  set(this, 'comment', {});

  renderPage();
  assert.ok(page.rendersMarkdown, 'The markdown input is rendered');
  assert.ok(page.rendersSaveButton, 'The save button is rendered');
});

test('it calls action when user clicks submit', function(assert) {
  assert.expect(1);

  stubService(this, 'session', mockSession);

  set(this, 'comment', Object.create({ markdown: 'Test markdown' }));
  setHandler(this, (markdown) => {
    assert.equal(markdown, 'Test markdown', 'Action was called with proper parameter');
  });

  renderPage();
  page.clickSave();
});

test('it renders a sign up button and sign in link when not authenticated', function(assert) {
  assert.expect(2);

  renderPage();

  assert.ok(page.rendersSignup, 'Sign up link is rendered');
  assert.ok(page.rendersLogin, 'Login ink is rendered');
});
