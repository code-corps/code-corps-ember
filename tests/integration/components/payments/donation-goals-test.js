import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import paymentsDonationGoalsComponent from '../../../pages/components/payments/donation-goals';

let page = PageObject.create(paymentsDonationGoalsComponent);

moduleForComponent('payments/donation-goals', 'Integration | Component | payments/donation goals', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders correctly when pending requirement', function(assert) {
  assert.expect(3);

  this.render(hbs`{{payments/donation-goals project=project stripeConnectAccount=stripeConnectAccount}}`);

  assert.ok(page.rendersHeader, 'Renders header');
  assert.ok(page.hasPendingRequirementStatus, 'Is pending requirement');
  assert.notOk(page.rendersSection, 'Does not render section');
});

test('it renders correctly when required', function(assert) {
  assert.expect(3);

  set(this, 'project', { donationsActive: false });
  set(this, 'stripeConnectAccount', { payoutsEnabled: true });

  this.render(hbs`{{payments/donation-goals project=project stripeConnectAccount=stripeConnectAccount}}`);

  assert.ok(page.rendersHeader, 'Renders header');
  assert.ok(page.hasRequiredStatus, 'Is required');
  assert.ok(page.rendersSection, 'Renders section');
});

test('it renders correctly when verified', function(assert) {
  assert.expect(3);

  set(this, 'project', { donationsActive: true });
  set(this, 'stripeConnectAccount', { payoutsEnabled: true });

  this.render(hbs`{{payments/donation-goals project=project stripeConnectAccount=stripeConnectAccount}}`);

  assert.ok(page.rendersHeader, 'Renders header');
  assert.ok(page.hasVerifiedStatus, 'Is verified');
  assert.notOk(page.rendersSection, 'Does not render section');
});

test('it renders a link to set up donation goals when possible', function(assert) {
  assert.expect(1);

  set(this, 'project', { canActivateDonations: true, donationsActive: false });
  set(this, 'stripeConnectAccount', { payoutsEnabled: true });

  this.render(hbs`{{payments/donation-goals project=project stripeConnectAccount=stripeConnectAccount}}`);

  assert.ok(page.rendersLinkToDonationGoals, 'Renders link to donation goals.');
});
