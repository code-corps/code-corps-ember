import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

const {
  Object,
  K
} = Ember;

let mockGoal = Object.create({ amount: 20, description: 'Some description' });

function setHandlers(context, { saveHandler = K, cancelHandler = K } = {}) {
  context.set('saveHandler', saveHandler);
  context.set('cancelHandler', cancelHandler);
}

moduleForComponent('edit-donation-goal', 'Integration | Component | donation goal edit', {
  integration: true,
  beforeEach() {
    this.set('donationGoal', mockGoal);
    setHandlers(this);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal-edit donationGoal=donationGoal cancel=cancelHandler save=saveHandler}}`);

  assert.equal(this.$('.donation-goal-edit').length, 1);
});

test('it renders cancel button, when canCancel is true', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal-edit donationGoal=donationGoal canCancel=true cancel=cancelHandler save=saveHandler}}`);

  assert.equal(this.$('.cancel').length, 1, 'The "cancel" button is rendered');
});

test('it does not render cancel button, when canCancel is false', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal-edit donationGoal=donationGoal canCancel=false save=saveHandler}}`);

  assert.equal(this.$('.cancel').length, 0, 'The "cancel" button is not rendered');
});

test('it sends save action, with user input properties as argument, when save button is clicked', function(assert) {
  assert.expect(2);

  let mockProperties = { amount: '10', description: 'Updated description' };
  let saveHandler = function(sumbittedGoal, submitedProperties) {
    assert.deepEqual(submitedProperties, mockProperties, 'submitted values are passed to external action');
    assert.deepEqual(sumbittedGoal, mockGoal, 'donation goal is curried unchanged');
  };

  setHandlers(this, { saveHandler });

  this.render(hbs`{{donation-goal-edit donationGoal=donationGoal save=(action saveHandler donationGoal)}}`);

  this.$('.donation-goal-edit__amount-group__amount').val(mockProperties.amount).change();
  this.$('.description').val(mockProperties.description).change();
  this.$('.save').click();
});

test('it sends cancel action, when cancel button is clicked', function(assert) {
  assert.expect(1);

  let cancelHandler = function(actualGoal) {
    assert.deepEqual(mockGoal, actualGoal, 'donation goal is curried unchanged');
  };

  setHandlers(this, { cancelHandler });

  this.render(hbs`{{donation-goal-edit donationGoal=donationGoal canCancel=true cancel=(action cancelHandler donationGoal) save=saveHandler}}`);

  this.$('.cancel').click();
});
