import { test } from 'qunit';
import { get } from '@ember/object';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/project/conversations';

const hour = 3600 * 1000;

function createConversations(count, project, user) {
  return [...Array(count)].map(() => {
    let message = server.create('message', { project });
    return server.create('conversation', { message, user }, 'withConversationParts');
  });
}

moduleForAcceptance('Acceptance | Project Conversations');

test('Page requires authentication', function(assert) {
  assert.expect(1);

  let project = server.create('project');

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('Page requires current user to be admin', async function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'contributor' });
  authenticateSession(this.application, { user_id: user.id });

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  assert.equal(currentRouteName(), 'project.index', 'User was redirected to base project route.');
});

test('Project admin can view list of conversations', async function(assert) {
  assert.expect(2);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  let [message1, message2, message3] = server.createList('message', 3, { project });

  let [date1, date2, date3] = [
    Date.now(),
    Date.now() - 5 * hour,
    Date.now() - 1 * hour
  ];

  server.create('conversation', { message:  message1, user, updatedAt: date1 });
  server.create('conversation', { message:  message2, user, updatedAt: date2 });
  server.create('conversation', { message:  message3, user, updatedAt: date3 });

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

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

test('Project admin can view single conversations', async function(assert) {
  assert.expect(5);

  let store = this.application.__container__.lookup('service:store');
  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(3, project, user);

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  await page.conversations.objectAt(1).click();

  andThen(() => {
    assert.equal(currentRouteName(), 'project.conversations.conversation');

    let conversation = store.peekRecord('conversation', server.db.conversations[1].id);
    let firstPart = conversation.get('sortedConversationParts').get('firstObject');
    let lastPart = conversation.get('sortedConversationParts').get('lastObject');
    assert.equal(page.conversationThread.conversationParts.length, 11, 'Message head and conversation parts rendered');
    assert.equal(page.conversationThread.conversationParts.objectAt(1).body.text, firstPart.get('body'), 'first conversation part is rendered correctly');
    assert.equal(page.conversationThread.conversationParts.objectAt(10).body.text, lastPart.get('body'), 'last conversation part is rendered correctly');
    assert.ok(firstPart.get('insertedAt') < lastPart.get('insertedAt'), 'conversations are sorted correctly');
  });
});

test('System is notified of new conversation part', async function(assert) {
  assert.expect(3);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  let [conversation] = createConversations(1, project, user);

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  page.conversations.objectAt(0).click();

  assert.equal(page.conversationThread.conversationParts.length, 11, 'Just the message head and conversation parts is rendered.');
  server.create('conversation-part', { conversation });

  assert.equal(page.conversationThread.conversationParts.length, 11, 'No notification yet, so new part was not rendered.');
  let conversationChannelService = this.application.__container__.lookup('service:conversation-channel');
  let socket = get(conversationChannelService, 'socket.socket');
  let [channel] = socket.channels;
  channel.trigger('new:conversation-part', {});

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts.length, 12, 'Notification was sent. New part is rendered.');
  });
});

test('Project admin can post to a conversation', async function(assert) {
  assert.expect(2);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(1, project, user);

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  page.conversations.objectAt(0).click();

  page.conversationThread.conversationComposer.as((composer) => {
    composer.submittableTextarea.fillIn('Foo');
    composer.submitButton.click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.conversations.conversation');
    assert.ok(server.schema.conversationParts.findBy({ body: 'Foo' }), 'Conversation part was created');
  });
});

test('Project admin can close a conversation', async function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(1, project, user);

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  await page.conversations.objectAt(0).closeButton.click();

  assert.equal(server.schema.conversations.first().status, 'closed', 'Conversation was closed.');
});

test('Project admin can reopen a conversation', async function(assert) {
  assert.expect(2);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  let message = server.create('message', { project });
  server.create('conversation', { status: 'closed', message, user });

  await page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  await page.statusSelect.openButton.click();
  await page.statusSelect.closedLink.click();
  await page.conversations.objectAt(0).reopenButton.click();
  await page.statusSelect.closedButton.click();
  await page.statusSelect.openLink.click();

  assert.ok(page.conversations.objectAt(0).isVisible, 'The conversation is in the open list.');
  assert.equal(server.schema.conversations.first().status, 'open', 'Conversation was reopened.');
});
