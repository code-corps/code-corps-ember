import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import detailsFormComponent from 'code-corps-ember/tests/pages/components/payments/funds-recipient/details-form';

let page = PageObject.create(detailsFormComponent);

function renderPage() {
  page.render(
    hbs`{{payments/funds-recipient/details-form account=account onSubmit=onSubmit}}`
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

test('it sends out correct properties when submitting in business mode', function(assert) {
  assert.expect(1);

  let expectedProperties = {
    businessName: 'Test Business',
    businessEin: '1234',
    recipientType: 'business',
    firstName: 'Joe',
    lastName: 'Regular',
    dobDay: 6,
    dobMonth: 12,
    dobYear: 1986,
    address1: 'Some street 42',
    address2: 'PO 21',
    city: 'Town',
    state: 'AL',
    zip: '11111',
    country: 'US',
    ssnLast4: '5555'
  };

  this.set('onSubmit', (properties) => {
    assert.deepEqual(properties, expectedProperties, 'Correct properties were submitted');
  });

  renderPage();

  page.selectBusiness()
      .businessName(expectedProperties.businessName)
      .businessEin(expectedProperties.businessEin)
      .firstName(expectedProperties.firstName)
      .lastName(expectedProperties.lastName)
      .address1(expectedProperties.address1)
      .address2(expectedProperties.address2)
      .city(expectedProperties.city)
      .zip(expectedProperties.zip)
      .ssnLast4(expectedProperties.ssnLast4);

  page.state.fillIn(expectedProperties.state);
  page.country.fillIn(expectedProperties.country);
  page.birthDate.day.fillIn(expectedProperties.dobDay);
  page.birthDate.month.fillIn(expectedProperties.dobMonth);
  page.birthDate.year.fillIn(expectedProperties.dobYear);

  page.clickSubmit();
});

test('it sends out correct properties when submitting in individual mode', function(assert) {
  assert.expect(1);

  let expectedProperties = {
    recipientType: 'individual',
    firstName: 'Joe',
    lastName: 'Regular',
    dobDay: 6,
    dobMonth: 12,
    dobYear: 1986,
    address1: 'Some street 42',
    address2: 'PO 21',
    city: 'Town',
    state: 'AL',
    zip: '11111',
    country: 'US',
    ssnLast4: '5555'
  };

  this.set('onSubmit', (properties) => {
    assert.deepEqual(properties, expectedProperties, 'Correct properties were submitted');
  });

  renderPage();

  page.selectIndividual()
      .firstName(expectedProperties.firstName)
      .lastName(expectedProperties.lastName)
      .address1(expectedProperties.address1)
      .address2(expectedProperties.address2)
      .city(expectedProperties.city)
      .zip(expectedProperties.zip)
      .ssnLast4(expectedProperties.ssnLast4);

  page.state.fillIn(expectedProperties.state);
  page.country.fillIn(expectedProperties.country);
  page.birthDate.day.fillIn(expectedProperties.dobDay);
  page.birthDate.month.fillIn(expectedProperties.dobMonth);
  page.birthDate.year.fillIn(expectedProperties.dobYear);

  page.clickSubmit();
});
