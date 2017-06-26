import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/donation-goal';

const {
  set
} = Ember;

let mockGoal = {
  amount: 500, // dollars
  description: 'A test goal'
};

function setHandler(context, editHandler = function() {}) {
  set(context, 'editHandler', editHandler);
}

let page = PageObject.create(component);

moduleForComponent('donation-goal', 'Integration | Component | donation goal', {
  integration: true,
  beforeEach() {
    set(this, 'donationGoal', mockGoal);
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it displays the donation goal info', function(assert) {
  assert.expect(2);

  page.render(hbs`{{donation-goal donationGoal=donationGoal}}`);

  assert.equal(page.amount.text, '$500.00', 'Correct amount is rendered');
  assert.equal(page.description.text, 'A test goal', 'Correct description is rendered');
});

test('it renders the edit link, if canEdit flag is set to true', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donation-goal canEdit=true edit=editHandler donationGoal=donationGoal}}`);

  assert.ok(page.editButton.isVisible);
});

test('it does not render the edit link, if canEdit flag is set to false', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donation-goal canEdit=false donationGoal=donationGoal}}`);

  assert.notOk(page.editButton.isVisible);
});
