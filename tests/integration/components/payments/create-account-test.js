import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import moment from 'moment';

import createAccountComponent from '../../../pages/components/payments/create-account';

const {
  set
} = Ember;

let page = PageObject.create(createAccountComponent);

function setHandler(context, submitHandler = function() {}) {
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

test('it renders "Terms of Service" acceptance info', function(assert) {
  assert.expect(2);

  renderPage();

  // This is some pretty specific testing we have here, but I think, for legal purposes, it makes sense for tests to ensure
  // no one clears the element containing this text by accident.
  let legalText = 'By registering your account, you agree to our Terms of Use and the Stripe Connected Account Agreement.';
  assert.ok(page.text.indexOf(legalText) > -1, 'The wording for the legal text is present');
  assert.ok(page.rendersStripeLegal, 'The link to Stripe legal information is rendered');
});

test('it sends properties with submit action', function(assert) {
  assert.expect(3);

  setHandler(this, (properties) => {
    let timestamp = properties.tosAcceptanceDate;
    let time = moment.unix(timestamp);
    let now = moment.utc();
    let diff = time.diff(now, 'seconds');

    assert.equal(properties.country, 'US', 'Correct parameter was sent out with action.');
    assert.ok(properties.tosAcceptanceDate, 'The ToS acceptance date was sent with action');
    assert.equal(diff, 0, 'The timestamp uses seconds and not milliseconds');
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
