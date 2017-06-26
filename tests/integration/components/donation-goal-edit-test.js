import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/donation-goal-edit';

let page = PageObject.create(component);

import Ember from 'ember';

const { set } = Ember;

let mockGoal = { amount: 20, description: 'Some description' };

function setHandlers(context, { saveHandler = function() {}, cancelHandler = function() {} } = {}) {
  set(context, 'saveHandler', saveHandler);
  set(context, 'cancelHandler', cancelHandler);
}

moduleForComponent('donation-goal-edit', 'Integration | Component | donation goal edit', {
  integration: true,
  beforeEach() {
    set(this, 'donationGoal', mockGoal);
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders cancel button, when canCancel is true', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donation-goal-edit donationGoal=donationGoal canCancel=true cancel=cancelHandler save=saveHandler}}`);

  assert.ok(page.cancelButtonIsVisible);
});

test('it does not render cancel button, when canCancel is false', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donation-goal-edit donationGoal=donationGoal canCancel=false save=saveHandler}}`);

  assert.notOk(page.cancelButtonIsVisible);
});

test('it sends save action, with user input properties as argument, when save button is clicked', function(assert) {
  assert.expect(2);

  let mockProperties = { amount: '10', description: 'Updated description' };
  let saveHandler = function(sumbittedGoal, { amount, description }) {
    assert.deepEqual({ amount, description }, mockProperties, 'submitted values are passed to external action');
    assert.deepEqual(sumbittedGoal, mockGoal, 'donation goal is curried unchanged');
  };

  setHandlers(this, { saveHandler });

  page.render(hbs`{{donation-goal-edit donationGoal=donationGoal save=(action saveHandler donationGoal)}}`);

  page.fillInAmount(mockProperties.amount)
      .fillInDescription(mockProperties.description)
      .clickSave();
});

test('it sends cancel action, when cancel button is clicked', function(assert) {
  assert.expect(1);

  let cancelHandler = function(actualGoal) {
    assert.deepEqual(mockGoal, actualGoal, 'donation goal is curried unchanged');
  };

  setHandlers(this, { cancelHandler });

  page.render(hbs`{{donation-goal-edit donationGoal=donationGoal canCancel=true cancel=(action cancelHandler donationGoal) save=saveHandler}}`);

  page.clickCancel();
});
