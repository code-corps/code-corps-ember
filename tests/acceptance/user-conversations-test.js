import { test } from 'qunit';
import { get } from '@ember/object';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/conversations';

moduleForAcceptance('Acceptance | User Conversations');

test('Page requires authentication', function(assert) {
  assert.expect(1);

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('User can view list of their own conversations', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  server.createList('conversation', 3, { user });

  page.visit();

  andThen(() => {
    assert.equal(page.conversations().count, 3, 'Conversations are rendered');
  });
});

test('User can view single conversations', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  server.create('conversation', { user });

  page.visit();

  andThen(() => {
    page.conversations(0).click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'conversations.conversation');
  });
});

test('System is notified of new conversation part', function(assert) {
  assert.expect(3);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let conversation = server.create('conversation', { user });

  page.visit();

  andThen(() => {
    page.conversations(0).click();
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts().count, 1, 'Just the message head is rendered.');
    server.create('conversation-part', { conversation });
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts().count, 1, 'No notification yet, so new part was not rendered.');
    let conversationChannelService = this.application.__container__.lookup('service:conversation-channel');
    let socket = get(conversationChannelService, 'socket');
    let [channel] = socket.channels;
    channel.trigger('new:conversation-part', {});
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts().count, 2, 'Notification was sent. New part is rendered.');
  });
});

test('User can post to a conversation', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  server.create('conversation', { user });

  page.visit();

  andThen(() => {
    page.conversations(0).click();
  });

  andThen(() => {
    page.conversationThread.conversationComposer.as((composer) => {
      composer.submittableTextarea.fillIn('Foo');
      composer.submitButton.click();
    });
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'conversations.conversation');
    assert.ok(server.schema.conversationParts.findBy({ body: 'Foo' }), 'Conversation part was created');
  });
});
