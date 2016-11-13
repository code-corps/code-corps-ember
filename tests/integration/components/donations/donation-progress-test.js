import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import PageObject from 'ember-cli-page-object';
import donationProgressComponent from '../../../pages/components/donations/donation-progress';

let page = PageObject.create(donationProgressComponent);

moduleForComponent('donations/donation-progress', 'Integration | Component | donations/donation progress', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders proper information', function(assert) {
  assert.expect(4);

  let mockGoal = { amount: 1000, description: 'Lorem ipsum' };

  this.set('donationGoal', mockGoal);

  page.render(hbs`{{donations/donation-progress donationGoal=donationGoal amountDonated=500}}`);

  assert.equal(page.amount, '$500', 'Correct amount is rendered');
  assert.equal(page.percentage, '50%', 'Correct percentage is rendered');
  assert.equal(page.description, mockGoal.description, 'Goal description is rendered');
  assert.ok(page.rendersProgressBar, 'Progress bar component is rendered');
});

test('it renders decimal values if there are any', function(assert) {
  assert.expect(3);

  let mockGoal = { amount: 1000, description: 'Lorem ipsum' };

  this.set('donationGoal', mockGoal);

  page.render(hbs`{{donations/donation-progress donationGoal=donationGoal amountDonated=505.50}}`);

  assert.equal(page.amount, '$505.50', 'Correct amount is rendered');
  assert.equal(page.percentage, '50.5%', 'Correct percentage is rendered');
  assert.ok(page.rendersProgressBar, 'Progress bar component is rendered');
});
