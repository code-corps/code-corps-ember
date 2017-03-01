import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';

import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectThankYouPage from '../pages/project/thank-you';

moduleForAcceptance('Acceptance | Project - thank-you');

test('It requires authentication', function(assert) {
  assert.expect(1);

  let project = server.create('project');
  let { organization } = project;

  projectThankYouPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('It directs you to the project when done', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { 'user_id': user.id });

  let project = server.create('project');
  let { organization } = project;

  projectThankYouPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectThankYouPage.thankYouContainer.isVisible, 'The thank you container component renders.');

    projectThankYouPage.thankYouContainer.clickLink();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'Link leads to project page.');
  });
});
