import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';

import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import projectThankYouPage from '../pages/project/thankyou';

moduleForAcceptance('Acceptance | Project - ThankYou');

test('It requires authentication', function(assert) {
  assert.expect(1);

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  projectThankYouPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('It renders project header', function(assert) {
  assert.expect(5);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  projectThankYouPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectThankYouPage.rendersProjectHeader, 'Project header is rendered on the page.');
    assert.ok(projectThankYouPage.rendersIcon, 'The success icon is rendered on the page.');
    assert.ok(projectThankYouPage.rendersThankYouHeader, 'A thank you header is rendered on the page.');
    assert.ok(projectThankYouPage.rendersText, 'A descriptive text is rendered on the page.');

    projectThankYouPage.clickProjectLink();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'Link leads to project page.');
  });
});
