import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import PageObject from 'ember-cli-page-object';
import component from '../../../pages/components/project-card/donation-progress';

let page = PageObject.create(component);

moduleForComponent('project-card/donation-progress', 'Integration | Component | project card/donation progress', {
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

  let mockGoal = { amount: 1000 };

  this.set('donationGoal', mockGoal);

  page.render(hbs`{{project-card/donation-progress donationGoal=donationGoal amountDonated=500}}`);

  assert.equal(page.amountValue, '$500', 'Correct amount value is rendered');
  assert.equal(page.percentageLabel, 'of $1,000 goal', 'Correct percentage label is rendered');
  assert.equal(page.percentageValue, '50%', 'Correct percentage value is rendered');
  assert.ok(page.progressBar.isVisible, 'Progress bar component is rendered');
});

test('it renders decimal values if there are any', function(assert) {
  assert.expect(4);

  let mockGoal = { amount: 1000, description: 'Lorem ipsum' };

  this.set('donationGoal', mockGoal);

  page.render(hbs`{{project-card/donation-progress donationGoal=donationGoal amountDonated=505.50}}`);

  assert.equal(page.amountValue, '$505.50', 'Correct amount is rendered');
  assert.equal(page.percentageLabel, 'of $1,000 goal', 'Correct percentage label is rendered');
  assert.equal(page.percentageValue, '50.5%', 'Correct percentage is rendered');
  assert.ok(page.progressBar.isVisible, 'Progress bar component is rendered');
});
