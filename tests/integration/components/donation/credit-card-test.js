import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

import creditCardComponent from '../../../pages/components/donation/credit-card';

let page = PageObject.create(creditCardComponent);

const { K } = Ember;

let setHandler = function(context, handlerName, handler = K) {
  context.set(handlerName, handler);
};

moduleForComponent('donation/credit-card', 'Integration | Component | donation/credit card', {
  integration: true,
  beforeEach() {
    setHandler(this, 'submitHandler');
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sends submit with credit card fields when button is clicked', function(assert) {
  assert.expect(1);

  let expectedProps = {
    cardNumber: '1234-5678-9012-3456',
    cvc: '123',
    month: '12',
    year: '2020'
  };

  let submitHandler = function(actualProps) {
    assert.deepEqual(actualProps, expectedProps, 'Action was called with proper attributes.');
  };

  setHandler(this, 'submitHandler', submitHandler);

  stubService(this, 'stripe', {
    card: {
      validateCardNumber: () => true,
      validateCVC: () => true,
      validateExpiry: () => true
    }
  });

  page.render(hbs`{{donation/credit-card submit=submitHandler}}`);
  page.cardNumber.fillIn(expectedProps.cardNumber);
  page.cardMonth.selectOption(expectedProps.month);
  page.cardCVC.fillIn(expectedProps.cvc);
  page.cardYear.selectOption(expectedProps.year);
  page.clickSubmit();
});

test('it renders button as disabled and "Donate" when card is invalid', function(assert) {
  assert.expect(2);

  page.render(hbs`{{donation/credit-card submit=submitHandler}}`);

  stubService(this, 'stripe', {
    card: {
      validateCardNumber: () => false,
      validateCVC: () => false,
      validateExpiry: () => false
    }
  });

  assert.ok(page.submitDisabled, 'Submit button is disabled');
  assert.equal(page.submitButtonText, 'Donate', 'Submit button changed text');
});
