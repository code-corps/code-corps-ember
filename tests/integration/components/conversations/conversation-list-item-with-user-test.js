import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-list-item-with-user';
import moment from 'moment';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-list-item-with-user
      close=onClose
      reopen=onReopen
      conversation=conversation
    }}
  `);
}

moduleForComponent('conversations/conversation-list-item-with-user', 'Integration | Component | conversations/conversation list item with user', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onClose', () => {});
    set(this, 'onReopen', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the conversation details', function(assert) {
  assert.expect(5);

  let user = {
    name: 'Test User',
    photoThumbUrl: 'http://lorempixel.com/25/25/',
    username: 'testuser'
  };

  let conversation = {
    status: 'open',
    updatedAt: moment().subtract(2, 'days'),
    user
  };

  set(this, 'conversation', conversation);

  renderPage();

  assert.equal(page.target.photo.url, user.photoThumbUrl, 'The target user photo renders');
  assert.equal(page.target.name.text, user.name, 'The target user name renders');
  assert.equal(page.target.username.text, user.username, 'Their username renders');
  assert.equal(page.updatedAt.text, '2 days ago', 'The updated at timestamp renders');
  assert.equal(page.closeButton.text, 'Close', 'Close button text is correct');
});

test('it renders close button when conversation is open', function(assert) {
  assert.expect(3);

  let user = {
    username: 'testuser'
  };

  let conversation = {
    status: 'open',
    user
  };

  set(this, 'conversation', conversation);

  renderPage();

  // we use isPresent because the buttons only display on hover and are
  // otherwise set to `display: none;`
  assert.ok(page.closeButton.isPresent, 'Close button is rendered');
  assert.notOk(page.reopenButton.isPresent, 'Reopen button is not rendered');
  assert.equal(page.closeButton.text, 'Close', 'Close button text is correct');
});

test('it renders reopen button when conversation is closed', function(assert) {
  assert.expect(3);

  let user = {
    username: 'testuser'
  };

  let conversation = {
    status: 'closed',
    user
  };

  set(this, 'conversation', conversation);

  renderPage();

  // we use isPresent because the buttons only display on hover and are
  // otherwise set to `display: none;`
  assert.notOk(page.closeButton.isPresent, 'Close button is not rendered');
  assert.ok(page.reopenButton.isPresent, 'Reopen button is rendered');
  assert.equal(page.reopenButton.text, 'Reopen', 'Reopen button text is correct');
});

test('it calls bound action when clicking close button', function(assert) {
  assert.expect(1);

  let user = {
    username: 'testuser'
  };

  let conversation = {
    id: '1',
    status: 'open',
    user
  };

  set(this, 'conversation', conversation);

  set(this, 'onClose', (c) => {
    assert.equal(c, conversation, 'Action was called with correct argument');
  });

  renderPage();

  page.closeButton.click();
});

test('it calls bound action when clicking reopen button', function(assert) {
  assert.expect(1);

  let user = {
    username: 'testuser'
  };

  let conversation = {
    id: '1',
    status: 'closed',
    user
  };

  set(this, 'conversation', conversation);

  set(this, 'onReopen', (c) => {
    assert.equal(c, conversation, 'Action was called with correct argument');
  });

  renderPage();

  page.reopenButton.click();
});
