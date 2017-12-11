import { test } from 'qunit';
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
