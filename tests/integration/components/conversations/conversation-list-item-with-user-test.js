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
      conversation=conversation
    }}
  `);
}

moduleForComponent('conversations/conversation-list-item-with-user', 'Integration | Component | conversations/conversation list item with user', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onClose', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the conversation details', function(assert) {
  assert.expect(4);

  let user = {
    name: 'Test User',
    photoThumbUrl: 'http://lorempixel.com/25/25/',
    username: 'testuser'
  };

  let conversation = {
    updatedAt: moment().subtract(2, 'days'),
    user
  };

  set(this, 'conversation', conversation);

  renderPage();

  assert.equal(page.target.photo.url, user.photoThumbUrl, 'The target user photo renders');
  assert.equal(page.target.name.text, user.name, 'The target user name renders');
  assert.equal(page.target.username.text, user.username, 'Their username renders');
  assert.equal(page.updatedAt.text, '2 days ago', 'The updated at timestamp renders');
});

test('it does not render close button when conversation is closed', function(assert) {
  assert.expect(1);

  let user = {
    username: 'testuser'
  };

  let conversation = {
    status: 'closed',
    user
  };

  set(this, 'conversation', conversation);

  renderPage();

  assert.notOk(page.closeButton.isVisible, 'Close button is hidden');
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
