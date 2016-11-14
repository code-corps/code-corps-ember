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

let setHandler = function(context, submitHandler = K) {
  context.set('submitHandler', submitHandler);
};

moduleForComponent('donation/credit-card', 'Integration | Component | donation/credit card', {
  integration: true,
  beforeEach() {
    setHandler(this);
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

  setHandler(this, submitHandler);

  stubService(this, 'stripe', {
    card: {
      validateCardNumber: () => true,
      validateCVC: () => true,
      validateExpiry: () => true
    }
  });

  page.render(hbs`{{donation/credit-card canDonate=canDonate submit=submitHandler}}`)
      .cardNumber(expectedProps.cardNumber)
      .cardMonth(expectedProps.month)
      .cardYear(expectedProps.year)
      .cardCVC(expectedProps.cvc)
      .clickSubmit();

  wait().then(() => {
    done();
  });
});
