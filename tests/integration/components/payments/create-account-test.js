import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import createAccountComponent from '../../../pages/components/payments/create-account';

const { K, set } = Ember;

let page = PageObject.create(createAccountComponent);

function setHandler(context, submitHandler = K) {
  context.set('submitHandler', submitHandler);
}

function renderPage() {
  page.render(hbs`{{payments/create-account isBusy=isBusy onCreateStripeConnectAccount=submitHandler}}`);
}

moduleForComponent('payments/create-account', 'Integration | Component | payments/create account', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sends properties with submit action', function(assert) {
  assert.expect(1);

  setHandler(this, (country) => {
    assert.equal(country, 'US', 'Correct parameter was sent out with action.');
  });

  renderPage();
  page.clickSubmit();
});

test('it disables controls when busy', function(assert) {
  assert.expect(1);

  set(this, 'isBusy', true);

  renderPage();
  assert.ok(page.submitButtonIsDisabled, 'Submit button is disabled when busy.');
});
