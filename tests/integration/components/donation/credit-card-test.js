import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import wait from 'ember-test-helpers/wait';

import creditCardComponent from '../../../pages/components/donation/credit-card';

let page = PageObject.create(creditCardComponent);

const {
  K,
  RSVP,
  run
} = Ember;

let setHandler = function(context, handlerName, handler = K) {
  context.set(handlerName, handler);
};

let getFreshDates = function() {
  let date = new Date();
  let currentMonth = `0${date.getMonth() + 1}`.slice(-2);
  let currentYear = date.getFullYear();

  return {
    month: currentMonth,
    year: currentYear
  };
};

moduleForComponent('donation/credit-card', 'Integration | Component | donation/credit card', {
  integration: true,
  beforeEach() {
    setHandler(this, 'submitHandler');
    setHandler(this, 'cancelHandler');
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sends submit with credit card fields when button is clicked', function(assert) {
  let done = assert.async();
  assert.expect(3);

  this.set('canDonate', true);

  let expectedProps = {
    cardNumber: '1234-5678-9012-3456',
    cvc: '123',
    month: '12',
    year: '2020'
  };

  let submitHandler = function(actualProps) {
    return new RSVP.Promise((fulfill) => {
      run.next(() => {
        assert.deepEqual(actualProps, expectedProps, 'Action was called with proper attributes.');
        assert.ok(page.submitDisabled, 'Submit button is disabled');
        assert.equal(page.submitButtonText, 'Adding...', 'Submit button changed text');
        fulfill();
      });
    });
  };

  setHandler(this, 'submitHandler', submitHandler);

  stubService(this, 'stripe', {
    card: {
      validateCardNumber: () => true,
      validateCVC: () => true,
      validateExpiry: () => true
    }
  });

  page.render(hbs`{{donation/credit-card canDonate=canDonate submit=submitHandler}}`);
  page.cardNumber.fillIn(expectedProps.cardNumber);
  page.cardMonth.selectOption(expectedProps.month);
  page.cardCVC.fillIn(expectedProps.cvc);
  page.cardYear.selectOption(expectedProps.year);
  page.clickSubmit();

  wait().then(() => {
    done();
  });
});

test('cancel link should show if canCancel is true', function(assert) {
  assert.expect(1);
  page.render(hbs`{{donation/credit-card canCancel=true}}`);
  assert.ok(page.isCancelVisible, 'cancel link should be visible');
});

test('cancel link should not show if canCancel is false', function(assert) {
  assert.expect(1);
  page.render(hbs`{{donation/credit-card canCancel=false}}`);
  assert.notOk(page.isCancelVisible, 'cancel link should not be visible');
});

test('cancel clears the form fields and sends the proper action', function(assert) {
  assert.expect(9);

  let cancelHandler = function() {
    assert.ok(true, 'credit-cards component should call this from the cancel action');
  };

  let testInput = {
    cardNumber: '4242 4242 4242 4242',
    cardMonth: '12',
    cardYear: '2016',
    cardCVC: '422'
  };

  setHandler(this, 'cancelHandler', cancelHandler);

  page.render(hbs`{{donation/credit-card canCancel=true cancelAddCard=cancelHandler}}`);
  page.cardCVC.fillIn(testInput.cardCVC);
  page.cardMonth.selectOption(testInput.cardMonth);
  page.cardNumber.fillIn(testInput.cardNumber);
  page.cardYear.selectOption(testInput.cardYear);

  assert.equal(page.cardCVC.value, testInput.cardCVC);
  assert.equal(page.cardMonth.value, testInput.cardMonth);
  assert.equal(page.cardNumber.value, testInput.cardNumber);
  assert.equal(page.cardYear.value, testInput.cardYear);

  page.clickCancel();

  let freshDates = getFreshDates();
  assert.equal(page.cardCVC.value, '');
  assert.equal(page.cardMonth.value, freshDates.month);
  assert.equal(page.cardNumber.value, '');
  assert.equal(page.cardYear.value, freshDates.year);
});
