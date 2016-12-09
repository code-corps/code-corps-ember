import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import fundsRecipientComponent from '../../../pages/components/payments/funds-recipient';

let page = PageObject.create(fundsRecipientComponent);

moduleForComponent('payments/funds-recipient', 'Integration | Component | payments/funds recipient', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  page.render(hbs`{{payments/funds-recipient}}`);
  assert.equal(this.$('.funds-recipient').length, 1, 'Component renders');
});

// TODO: Write tests, remove 'it renders' test

// test('it sends out recipient info parameters on submit')
