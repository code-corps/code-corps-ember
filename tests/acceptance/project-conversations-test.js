import { test } from 'qunit';
import { get } from '@ember/object';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/project/conversations';

function createConversations(count, project, user) {
  return [...Array(count)].map(() => {
    let message = server.create('message', { project });
    return server.create('conversation', { message, user });
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

test('Page requires current user to be admin', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'contributor' });
  authenticateSession(this.application, { user_id: user.id });

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'User was redirected to base project route.');
  });
});

test('Project admin can view list of conversations', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(3, project, user);

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(page.conversations().count, 3, 'Conversations are rendered');
  });
});

test('Project admin can view single conversations', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(3, project, user);

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    page.conversations(1).click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.conversations.conversation');
  });
});

test('System is notified of new conversation part', function(assert) {
  assert.expect(3);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  let [conversation] = createConversations(1, project, user);

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

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
    let socket = get(conversationChannelService, 'socket.socket');
    let [channel] = socket.channels;
    channel.trigger('new:conversation-part', {});
  });

  andThen(() => {
    assert.equal(page.conversationThread.conversationParts().count, 2, 'Notification was sent. New part is rendered.');
  });
});

test('Project admin can post to a conversation', function(assert) {
  assert.expect(2);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(1, project, user);

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

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
    assert.equal(currentRouteName(), 'project.conversations.conversation');
    assert.ok(server.schema.conversationParts.findBy({ body: 'Foo' }), 'Conversation part was created');
  });
});

test('Project admin can close a conversation', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'admin' });
  authenticateSession(this.application, { user_id: user.id });

  createConversations(1, project, user);

  page.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    page.conversations(0).closeButton.click();
  });

  andThen(() => {
    assert.equal(server.schema.conversations.first().status, 'closed', 'Conversation was closed.');
  });
});
