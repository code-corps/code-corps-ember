import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import integrationsPage from '../pages/settings/integrations';

moduleForAcceptance('Acceptance | Settings – Integrations');

test('it requires authentication', function(assert) {
  assert.expect(1);

  integrationsPage.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it displays the github connect button if user is not connected to github', function(assert) {
  assert.expect(1);

  let user = server.create('user');

  authenticateSession(this.application, { user_id: user.id });

  integrationsPage.visit();

  andThen(() => {
    assert.ok(integrationsPage.githubConnectButton.isVisible);
  });
});

test('it does not display the github connect button if user is connected to github', function(assert) {
  assert.expect(1);

  let user = server.create('user', { githubId: 'foo' });

  authenticateSession(this.application, { user_id: user.id });

  integrationsPage.visit();

  andThen(() => {
    assert.notOk(integrationsPage.githubConnectButton.isVisible);
  });
});
