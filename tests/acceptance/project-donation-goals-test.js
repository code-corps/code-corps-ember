import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectSettingsDonationsPage from '../pages/project/settings/donations';
import Mirage from 'ember-cli-mirage';

moduleForAcceptance('Acceptance | Project Donation Goals');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let project = server.create('project');

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'User was redirected to project route');
  });
});

test('it redirects to project list page if user is not allowed to manage project', function(assert) {
  assert.expect(1);

  let project = server.create('project');
  let user = server.create('user');

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'User was redirected to project list route');
  });
});

test('it renders existing donation goals', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'owner' });

  server.createList('donation-goal', 3, { project });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.donationGoals.length, 3, 'All project donation goals are rendered');
  });
});

test('it sets up a new unsaved donation goal if there are no donation goals, which can be added', function(assert) {
  assert.expect(4);

  let { project, user } = server.create('project-user', { role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.editedDonationGoals.length, 1, 'A single edited donation goal form is rendered');
    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);

    form.amount(200);
    form.description('Lorem ipsum');
    form.clickSave();
  });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.donationGoals.length, 1, 'A single donation goal is rendered.');
    assert.equal(server.schema.donationGoals.all().models.length, 1, 'Donation goal has been saved.');
    // mirage doesn't support custom transforms, so we search by cents amount
    assert.ok(server.schema.donationGoals.findBy({ amount: 20000, description: 'Lorem ipsum' }), 'Attributes have been saved properly');
  });
});

test('it is possible to add a donation goal when donation goals already exists', function(assert) {
  assert.expect(3);

  let { project, user } = server.create('project-user', { role: 'owner' });
  server.createList('donation-goal', 1, { project });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    projectSettingsDonationsPage.clickAddNew();
    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);

    form.amount(200);
    form.description('Lorem ipsum');
    form.clickSave();
  });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.donationGoals.length, 2, 'Both donation goals are rendered.');
    assert.equal(server.schema.donationGoals.all().models.length, 2, 'Donation goal has been saved.');
    // mirage doesn't support custom transforms, so we search by cents amount
    assert.ok(server.schema.donationGoals.findBy({ amount: 20000, description: 'Lorem ipsum' }), 'Attributes have been saved properly');
  });
});

test('it allows editing of existing donation goals', function(assert) {
  assert.expect(3);

  let { project, user } = server.create('project-user', { role: 'owner' });
  server.createList('donation-goal', 1, { project });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    projectSettingsDonationsPage.donationGoals.objectAt(0).clickEdit();

    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);
    form.amount(200.50);
    form.description('Lorem ipsum');
    form.clickSave();
  });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.donationGoals.length, 1, 'A single donation goal is rendered.');
    assert.equal(server.schema.donationGoals.all().models.length, 1, 'Donation goal has been saved as update.');
    // mirage doesn't support custom transforms, so we search by cents amount
    assert.ok(server.schema.donationGoals.findBy({ amount: 20050, description: 'Lorem ipsum' }), 'Attributes have been saved properly');
  });
});

test('cancelling edit of an unsaved new goal removes that goal from the list', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'owner' });
  server.createList('donation-goal', 1, { project });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    projectSettingsDonationsPage.clickAddNew();

    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);
    form.clickCancel();
  });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.donationGoals.length, 1, 'New goal is not rendered anymore.');
  });
});

test('cancelling edit of an unsaved existing goal keeps that goal in the list', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'owner' });
  server.createList('donation-goal', 1, { project });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    projectSettingsDonationsPage.donationGoals.objectAt(0).clickEdit();

    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);
    form.clickCancel();
  });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.donationGoals.length, 1, 'Existing goal is still rendered.');
  });
});

test('it allows activating donations for the project', function(assert) {
  assert.expect(2);

  let { project, user } = server.create('project-user', { role: 'owner' });
  project.attrs.canActivateDonations = true;
  project.save();

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    projectSettingsDonationsPage.clickActivateDonationGoals();
  });

  andThen(() => {
    assert.equal(server.schema.stripeConnectPlans.all().models.length, 1, 'A single plan was created.');
    let plan = server.schema.stripeConnectPlans.first();
    assert.equal(plan.projectId, project.id, 'Project was correctly assigned to created plan.');
  });
});

test('it shows donation progress if donations are active', function(assert) {
  assert.expect(1);

  let project = server.create('project', { donationsActive: true });
  let { user } = server.create('project-user', { project, role: 'owner' });

  server.createList('donation-goal', 1, { project });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    assert.ok(projectSettingsDonationsPage.donationProgress.isVisible, 'It shows donation progress.');
  });
});

test('it does not show donation progress if donations are not active', function(assert) {
  assert.expect(1);

  let project = server.create('project', { donationsActive: false });
  let { user } = server.create('project-user', { project, role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    assert.notOk(projectSettingsDonationsPage.donationProgress.isVisible, 'It does not show donation progress.');
  });
});

test('it renders validation errors', function(assert) {
  assert.expect(3);

  let { project, user } = server.create('project-user', { role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  let done = assert.async();

  server.post('donation-goals', function() {
    done();
    return new Mirage.Response(422, {}, {
      errors: [{
        id: 'VALIDATION_ERROR',
        source: { pointer: 'data/attributes/amount' },
        detail: 'Amount is required',
        status: 422
      }, {
        id: 'VALIDATION_ERROR',
        source: { pointer: 'data/attributes/description' },
        detail: 'Description is required',
        status: 422
      }]
    });
  });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);
    form.clickSave();
  });

  andThen(() => {
    let form = projectSettingsDonationsPage.editedDonationGoals.objectAt(0);

    assert.equal(form.validationErrors.length, 2, 'Both validation errors are rendered.');
    assert.equal(form.validationErrors.objectAt(0).message, 'Amount is required');
    assert.equal(form.validationErrors.objectAt(1).message, 'Description is required');
  });
});

test('it renders other errors', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  let done = assert.async();

  server.post('donation-goals', function() {
    done();
    return new Mirage.Response(500, {}, {
      errors: [{
        id: 'INTERNAL SERVER ERROR',
        title: 'Something went wrong',
        detail: 'Something went wrong',
        status: 500
      }]
    });
  });

  projectSettingsDonationsPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(() => {
    projectSettingsDonationsPage.editedDonationGoals.objectAt(0).clickSave();
  });

  andThen(() => {
    assert.equal(projectSettingsDonationsPage.errorFormatter.errors.length, 1, 'The error is displayed');
  });
});
