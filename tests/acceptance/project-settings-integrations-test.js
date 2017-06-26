import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectIntegrationsPage from '../pages/project/settings/integrations';

moduleForAcceptance('Acceptance | Project Settings - Integrations');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let project = server.create('project');

  projectIntegrationsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it renders link to github app installation page if user is connected to GitHub', function(assert) {
  assert.expect(2);

  let user = server.create('user', { githubId: 12345 });
  let { project } = server.create('project-user', { role: 'owner', user });

  authenticateSession(this.application, { user_id: user.id });

  projectIntegrationsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.notOk(projectIntegrationsPage.integrationsLink.isVisible, 'The link to user profile integrations does not render');
    assert.ok(projectIntegrationsPage.installationLink.isVisible, 'The link to GitHub app installation renders');
  });
});

test('it renders link to user integrations page if user is not connected to GitHub', function(assert) {
  assert.expect(2);

  let user = server.create('user', { githubId: null });
  let { project } = server.create('project-user', { role: 'owner', user });

  authenticateSession(this.application, { user_id: user.id });

  projectIntegrationsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectIntegrationsPage.integrationsLink.isVisible, 'The link to user profile integrations renders');
    assert.notOk(projectIntegrationsPage.installationLink.isVisible, 'The link to GitHub app installation does not render');
  });
});
