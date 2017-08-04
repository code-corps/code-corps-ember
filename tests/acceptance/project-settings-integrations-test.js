import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectIntegrationsPage from 'code-corps-ember/tests/pages/project/settings/integrations';

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

test('it allows connecting and unconnecting installations', function(assert) {
  assert.expect(5);

  let user = server.create('user', { githubId: null });
  let { project } = server.create('project-user', { role: 'owner', user });

  server.create('github-app-installation', { user });

  authenticateSession(this.application, { user_id: user.id });

  projectIntegrationsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(
      projectIntegrationsPage.unconnectedInstallations().count, 1,
      'Installation is initially rendered as unconnected.'
    );
    projectIntegrationsPage.unconnectedInstallations(0).connect.click();
  });

  andThen(() => {
    assert.equal(
      projectIntegrationsPage.unconnectedInstallations().count, 0,
      'Upon hitting "connect", installation is no longer rendered as unconnected.'
    );
    assert.equal(
      projectIntegrationsPage.connectedInstallations().count, 1,
      'Upon hitting "connect", installation is now rendered as connected.'
    );
    projectIntegrationsPage.connectedInstallations(0).disconnect.click();
  });

  andThen(() => {
    assert.equal(
      projectIntegrationsPage.connectedInstallations().count, 0,
      'Upon hitting "disconnect", installation is no longer rendered as connected.'
    );
    assert.equal(
      projectIntegrationsPage.unconnectedInstallations().count, 1,
      'Upon hitting "disconnect", innstallation is now rendered as unconnected again.'
    );
  });
});

test('it allows connecting and unconnecting repos for a connected installation', function(assert) {
  assert.expect(11);
  let user = server.create('user', { githubId: null });
  let { project } = server.create('project-user', { role: 'owner', user });
  let { organization } = project;
  let githubAppInstallation = server.create('github-app-installation', { user });

  server.create('organization-github-app-installation', { organization, githubAppInstallation });
  server.create('github-repo', { githubAppInstallation });

  authenticateSession(this.application, { user_id: user.id });

  projectIntegrationsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(
      projectIntegrationsPage.connectedInstallations().count, 1,
      'Installation is initially rendered as connected.'
    );

    projectIntegrationsPage.connectedInstallations(0).as((installation) => {
      assert.equal(installation.githubRepos().count, 1, 'Github repo is rendered');
      assert.ok(
        installation.githubRepos(0).actions.connect.isVisible,
        'Github repo is unconnected, so "connect" is visible'
      );
      installation.githubRepos(0).actions.connect.click();
    });
  });

  andThen(() => {
    assert.equal(
      projectIntegrationsPage.connectedInstallations().count, 1,
      'Installation is still rendered as connected, after connecting repo.'
    );

    projectIntegrationsPage.connectedInstallations(0).as((installation) => {
      assert.equal(
        installation.githubRepos().count, 1,
        'Github repo is still rendered after connecting it.'
      );
      assert.notOk(
        installation.githubRepos(0).actions.connect.isVisible,
        'Github repo is now connected, so "connect" is no longer visible'
      );
      assert.ok(
        installation.githubRepos(0).actions.disconnect.isVisible,
        'Github repo is now connected, so "disconnect" is longer visible'
      );
      installation.githubRepos(0).actions.disconnect.click();
    });
  });

  andThen(() => {
    assert.equal(
      projectIntegrationsPage.connectedInstallations().count, 1,
      'Installation is still rendered as connected, after disconnecting again.'
    );

    projectIntegrationsPage.connectedInstallations(0).as((installation) => {
      assert.equal(
        installation.githubRepos().count, 1,
        'Github repo is still rendered, after disconnecting it again.');
      assert.ok(
        installation.githubRepos(0).actions.connect.isVisible,
        'Github repo is now disconnected again, so "connect" is longer visible'
      );
      assert.notOk(
        installation.githubRepos(0).actions.disconnect.isVisible,
        'Github repo is now disconnected again, so "disconnect" is no longer visible'
      );
    });
  });
});
