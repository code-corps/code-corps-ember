import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import projectSettingsDonationsPage from 'code-corps-ember/tests/pages/project/settings/donations';

moduleForAcceptance('Acceptance | Stripe Connect');

test('it navigates through Stripes OAuth flow', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  server.create('organizationMembership', {
    member: user,
    organization,
    role: 'admin'
  });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(projectSettingsDonationsPage.stripeConnectButton.href, '/oauth/stripe', 'Link to Stripe is properly rendered');
  });
});
