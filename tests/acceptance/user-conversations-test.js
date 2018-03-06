import { test } from 'qunit';
import { get } from '@ember/object';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/conversations';

const hour = 3600 * 1000;

moduleForAcceptance('Acceptance | User Conversations');

test('Page requires authentication', function(assert) {
  assert.expect(1);

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('User can view list of their own conversations', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let [date1, date2, date3] = [
    Date.now(),
    Date.now() - 5 * hour,
    Date.now() - 1 * hour
  ];

  server.create('conversation', { user, updatedAt: date1 });
  server.create('conversation', { user, updatedAt: date2 });
  server.create('conversation', { user, updatedAt: date3 });

  page.visit();

  andThen(() => {
    assert.equal(page.conversations.length, 3, 'Conversations are rendered');
    let renderedTimeStampOrder = [
      page.conversations.objectAt(0).updatedAt.text,
      page.conversations.objectAt(1).updatedAt.text,
      page.conversations.objectAt(2).updatedAt.text
    ];

    let expectedTimeStampOrder = [
      'a few seconds ago',
      'an hour ago',
      '5 hours ago'
    ];

    assert.deepEqual(
      renderedTimeStampOrder,
      expectedTimeStampOrder,
      'Items are rendered in correct order with properly formatted timestamps.'
    );
  });
});

test('User can view single conversations', function(assert) {
  assert.expect(5);

  let store = this.application.__container__.lookup('service:store');
  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  server.create('conversation', { user }, 'withConversationParts');

  page.visit();

  andThen(() => {
    page.conversations.objectAt(0).click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'conversations.conversation');

    let conversation = store.peekRecord('conversation', server.db.conversations[0].id);
    let firstPart = conversation.get('sortedConversationParts').get('firstObject');
    let lastPart = conversation.get('sortedConversationParts').get('lastObject');
    assert.equal(page.conversationThread.conversationParts.length, 11, 'Message head and conversation parts rendered');
    assert.equal(page.conversationThread.conversationParts.objectAt(1).body.text, firstPart.get('body'), 'first conversation part is rendered correctly');
    assert.equal(page.conversationThread.conversationParts.objectAt(10).body.text, lastPart.get('body'), 'last conversation part is rendered correctly');
    assert.ok(firstPart.get('insertedAt') < lastPart.get('insertedAt'), 'conversations are sorted correctly');
  });
});

test('System is notified of new conversation part', function(assert) {
  assert.expect(3);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let conversation = server.create('conversation', { user });

  page.visit();

  andThen(() => {
    page.conversations.objectAt(0).click();
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts.length, 1, 'Just the message head is rendered.');
    server.create('conversation-part', { conversation });
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts.length, 1, 'No notification yet, so new part was not rendered.');
    let conversationChannelService = this.application.__container__.lookup('service:conversation-channel');
    let socket = get(conversationChannelService, 'socket.socket');
    let [channel] = socket.channels;
    channel.trigger('new:conversation-part', {});
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts.length, 2, 'Notification was sent. New part is rendered.');
  });
});

test('User can post to a conversation', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  server.create('conversation', { user });

  page.visit();

  andThen(() => {
    page.conversations.objectAt(0).click();
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
