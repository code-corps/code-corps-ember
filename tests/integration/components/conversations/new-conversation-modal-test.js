import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/new-conversation-modal';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';
import sinon from 'sinon';
import { resolve } from 'rsvp';
import { getOwner } from '@ember/application';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/new-conversation-modal
      initiatedBy=initiatedBy
      project=project
      user=user
    }}
  `);
}

moduleForComponent('conversations/new-conversation-modal', 'Integration | Component | conversations/new conversation modal', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    this.inject.service('store', { as: 'store' });
    this.inject.service('currentUser', { as: 'currentUser' });
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it initiates a conversation and opens the modal when open button is clicked', function(assert) {
  assert.expect(7);

  let store = get(this, 'store');

  run(() => {
    set(this, 'initiatedBy', 'admin');
    set(this, 'project', store.createRecord('project', { id: 'foo' }));
    set(this, 'user', store.createRecord('user', { id: 'bar' }));
    set(this, 'currentUser.user', store.createRecord('user', { id: 'baz' }));
  });

  renderPage();

  assert.notOk(page.modal.isVisible, 'Modal is initially hidden.');
  page.openButton.click();
  assert.ok(page.modal.isVisible, 'Modal is now visible.');

  let message = get(store.peekAll('message'), 'firstObject');

  assert.equal(get(message, 'project.id'), 'foo');
  assert.equal(get(message, 'conversations.firstObject.user.id'), 'bar');
  assert.equal(get(message, 'conversations.firstObject.project.id'), 'foo');
  assert.equal(get(message, 'author.id'), 'baz');
  assert.equal(get(message, 'initiatedBy'), 'admin');
});

test('it keeps the modal open and retains the records when close button is clicked and prompt canceled', async function(assert) {
  assert.expect(6);

  let store = get(this, 'store');

  run(() => {
    set(this, 'initiatedBy', 'admin');
    set(this, 'project', store.createRecord('project', { id: 'foo' }));
    set(this, 'user', store.createRecord('user', { id: 'bar' }));
    set(this, 'currentUser.user', store.createRecord('user', { id: 'baz' }));
  });

  let messages = store.peekAll('message');
  let conversations = store.peekAll('conversation');

  renderPage();

  page.openButton.click();

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return false;
  });

  assert.equal(get(messages, 'length'), 1, 'A message was initialized');
  assert.equal(get(conversations, 'length'), 1, 'A conversation was initialized');

  page.modal.subject.fillIn('Test message');
  page.modal.body.fillIn('Lorem ipsum');

  await page.modal.close();

  assert.equal(get(messages, 'length'), 1, 'The message was kept');
  assert.equal(get(conversations, 'length'), 1, 'The conversation was kept');
  assert.ok(page.modal.isVisible, 'Modal was kept open');

  stub.restore();
});

test('it does not prompt when close button is clicked and the form has no data', async function(assert) {
  assert.expect(5);

  let store = get(this, 'store');

  run(() => {
    set(this, 'initiatedBy', 'admin');
    set(this, 'project', store.createRecord('project', { id: 'foo' }));
    set(this, 'user', store.createRecord('user', { id: 'bar' }));
    set(this, 'currentUser.user', store.createRecord('user', { id: 'baz' }));
  });

  let messages = store.peekAll('message');
  let conversations = store.peekAll('conversation');

  renderPage();

  page.openButton.click();

  assert.equal(get(messages, 'length'), 1, 'A message was initialized');
  assert.equal(get(conversations, 'length'), 1, 'A conversation was initialized');

  await page.modal.close();

  assert.equal(get(messages, 'length'), 0, 'The message was discarded');
  assert.equal(get(conversations, 'length'), 0, 'The conversation was discarded');
  assert.notOk(page.modal.isVisible, 'Modal was closed');
});

test('it discards the conversation and closes the modal when close button is clicked and prompt confirmed', async function(assert) {
  assert.expect(6);

  let store = get(this, 'store');

  run(() => {
    set(this, 'initiatedBy', 'admin');
    set(this, 'project', store.createRecord('project', { id: 'foo' }));
    set(this, 'user', store.createRecord('user', { id: 'bar' }));
    set(this, 'currentUser.user', store.createRecord('user', { id: 'baz' }));
  });

  renderPage();

  let messages = store.peekAll('message');
  let conversations = store.peekAll('conversation');

  page.openButton.click();

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  assert.equal(get(messages, 'length'), 1, 'A message was initialized');
  assert.equal(get(conversations, 'length'), 1, 'A conversation was initialized');

  page.modal.subject.fillIn('Test message');
  page.modal.body.fillIn('Lorem ipsum');

  await page.modal.close();

  assert.equal(get(messages, 'length'), 0, 'The message was discarded');
  assert.equal(get(conversations, 'length'), 0, 'The conversation was discarded');
  assert.notOk(page.modal.isVisible, 'Modal was hidden');

  stub.restore();
});

test('it saves the conversation and closes the modal when send button is clicked', function(assert) {
  assert.expect(3);

  let store = get(this, 'store');

  run(() => {
    set(this, 'initiatedBy', 'admin');
    set(this, 'project', store.createRecord('project', { id: 'foo' }));
    set(this, 'user', store.createRecord('user', { id: 'bar' }));
    set(this, 'currentUser.user', store.createRecord('user', { id: 'baz' }));
  });

  renderPage();

  let messages = store.peekAll('message');
  let conversations = store.peekAll('conversation');

  page.openButton.click();

  let message = get(messages, 'firstObject');
  set(message, 'save', function() {
    assert.ok(true, 'Save was called on message');
    // simulate inserting of API sent saved conversation payload into store
    store.createRecord('conversation', { message: this });
    return resolve(this);
  });

  page.modal.subject.fillIn('Test message');
  page.modal.body.fillIn('Lorem ipsum');
  page.modal.save();

  assert.equal(get(messages, 'length'), 1, 'The message was saved and kept');
  assert.equal(get(conversations, 'length'), 1, 'The conversation "saved" conversation was kept. The duplicate was discarded');
});

test('it renders validation errors', function(assert) {
  assert.expect(7);

  let store = get(this, 'store');

  run(() => {
    set(this, 'initiatedBy', 'admin');
    set(this, 'project', store.createRecord('project', { id: 'foo' }));
    set(this, 'user', store.createRecord('user', { id: 'bar' }));
    set(this, 'currentUser.user', store.createRecord('user', { id: 'baz' }));
  });

  let messages = store.peekAll('message');

  renderPage();

  page.openButton.click();

  run(() => {
    let message = get(messages, 'firstObject');
    set(message, 'errors.subject', [{ message: 'Foo' }]);
    set(message, 'errors.body', [{ message: 'Bar' }, { message: 'Baz' }]);
  });

  assert.ok(page.modal.subject.isErrored, 'Subject renders as errored');
  assert.equal(page.modal.subject.errors().count, 1, 'Correct number of errors is rendered');
  assert.equal(page.modal.subject.errors(0).text, 'Foo', 'Error is correctly rendered');
  assert.ok(page.modal.body.isErrored, 'Body renders as errored');
  assert.equal(page.modal.body.errors().count, 2, 'Correct number of errors is rendered');
  assert.equal(page.modal.body.errors(0).text, 'Bar', 'Error is correctly rendered');
  assert.equal(page.modal.body.errors(1).text, 'Baz', 'Error is correctly rendered');
});
