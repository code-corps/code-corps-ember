import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object
} = Ember;

let mockGoal = Object.create({
  amount: 500, // dollars
  description: 'A test goal'
});

function setHandler(context, editHandler = function() {}) {
  context.set('editHandler', editHandler);
}

moduleForComponent('donation-goal', 'Integration | Component | donation goal', {
  integration: true,
  beforeEach() {
    this.set('donationGoal', mockGoal);
    setHandler(this);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal}}`);

  assert.equal(this.$('.donation-goal').length, 1, 'Component element is rendered');
});

test('it displays the donation goal info', function(assert) {
  assert.expect(2);

  this.render(hbs`{{donation-goal donationGoal=donationGoal}}`);

  assert.equal(this.$('.amount').text().trim(), '$500.00', 'Correct amount is rendered');
  assert.equal(this.$('.description').text().trim(), 'A test goal', 'Correct description is rendered');
});

test('it renders the edit link, if canEdit flag is set to true', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal canEdit=true edit=editHandler donationGoal=donationGoal}}`);

  assert.equal(this.$('.edit').length, 1, 'Edit button is rendered');
});

test('it does not render the edit link, if canEdit flag is set to false', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation-goal canEdit=false donationGoal=donationGoal}}`);

  assert.equal(this.$('.edit').length, 0, 'Edit button is not rendered');
});
