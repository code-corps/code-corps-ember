import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import Ember from 'ember';

const {
  get
} = Ember;

import detailsFormComponent from 'code-corps-ember/tests/pages/components/payments/funds-recipient/details-form';

let page = PageObject.create(detailsFormComponent);

function renderPage() {
  page.render(
    hbs`{{payments/funds-recipient/details-form stripeConnectAccount=stripeConnectAccount onSubmit=onSubmit}}`
  );
}

moduleForComponent('payments/funds-recipient/details-form', 'Integration | Component | payments/funds recipient/details form', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it keeps the business properties when submitting in business mode', function(assert) {
  assert.expect(1);

  let account = {
    legalEntityType: 'business',
    legalEntityBusinessName: 'Test Business',
    legalEntityBusinessTaxId: '1234',
    legalEntityFirstName: 'Joe',
    legalEntityLastName: 'Regular',
    legalEntityDobDay: 6,
    legalEntityDobMonth: 12,
    legalEntityDobYear: 1986,
    legalEntityAddressLine1: 'Some street 42',
    legalEntityAddressLine2: 'PO 21',
    legalEntityAddressCity: 'Town',
    legalEntityAddressState: 'AL',
    legalEntityAddressPostalCode: '11111',
    legalEntityAddressCountry: 'US',
    legalEntitySsnLast4: '5555'
  };

  this.set('onSubmit', () => {
    assert.equal(get(account, 'legalEntityBusinessName'), 'Test Business');
  });

  this.set('stripeConnectAccount', account);

  renderPage();

  page.selectCompany()
      .legalEntityBusinessName(account.legalEntityBusinessName)
      .legalEntityBusinessTaxId(account.legalEntityBusinessTaxId)
      .legalEntityFirstName(account.legalEntityFirstName)
      .legalEntityLastName(account.legalEntityLastName)
      .legalEntityAddressLine1(account.legalEntityAddressLine1)
      .legalEntityAddressLine2(account.legalEntityAddressLine2)
      .legalEntityAddressCity(account.legalEntityAddressCity)
      .legalEntityAddressPostalCode(account.legalEntityAddressPostalCode)
      .legalEntitySsnLast4(account.legalEntitySsnLast4);

  page.state.fillIn(account.legalEntityAddressState);
  page.country.fillIn(account.legalEntityAddressCountry);
  page.birthDate.day.fillIn(account.legalEntityDobDay);
  page.birthDate.month.fillIn(account.legalEntityDobMonth);
  page.birthDate.year.fillIn(account.legalEntityDobYear);

  page.clickSubmit();
});

test('it unsets the business properties when submitting in individual mode', function(assert) {
  assert.expect(1);

  let account = {
    legalEntityType: 'individual',
    legalEntityBusinessName: 'Test Business',
    legalEntityBusinessTaxId: '1234',
    legalEntityFirstName: 'Joe',
    legalEntityLastName: 'Regular',
    legalEntityDobDay: 6,
    legalEntityDobMonth: 12,
    legalEntityDobYear: 1986,
    legalEntityAddressLine1: 'Some street 42',
    legalEntityAddressLine2: 'PO 21',
    legalEntityAddressCity: 'Town',
    legalEntityAddressState: 'AL',
    legalEntityAddressPostalCode: '11111',
    legalEntityAddressCountry: 'US',
    legalEntitySsnLast4: '5555'
  };

  this.set('onSubmit', () => {
    assert.equal(get(account, 'legalEntityBusinessName'), null);
  });

  this.set('stripeConnectAccount', account);

  renderPage();

  page.selectIndividual()
      .legalEntityFirstName(account.legalEntityFirstName)
      .legalEntityLastName(account.legalEntityLastName)
      .legalEntityAddressLine1(account.legalEntityAddressLine1)
      .legalEntityAddressLine2(account.legalEntityAddressLine2)
      .legalEntityAddressCity(account.legalEntityAddressCity)
      .legalEntityAddressPostalCode(account.legalEntityAddressPostalCode)
      .legalEntitySsnLast4(account.legalEntitySsnLast4);

  page.state.fillIn(account.legalEntityAddressState);
  page.country.fillIn(account.legalEntityAddressCountry);
  page.birthDate.day.fillIn(account.legalEntityDobDay);
  page.birthDate.month.fillIn(account.legalEntityDobMonth);
  page.birthDate.year.fillIn(account.legalEntityDobYear);

  page.clickSubmit();
});
