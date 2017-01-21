import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import contactInfoComponent from '../../../pages/components/payments/contact-info';

let page = PageObject.create(contactInfoComponent);

moduleForComponent('payments/contact-info', 'Integration | Component | payments/contact info', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders email', function(assert) {
  assert.expect(1);
  page.render(hbs`{{payments/contact-info email='test@example.com'}}`);
  assert.equal(page.email, 'test@example.com', 'The email is rendered');
});

// TODO: Write tests, remove 'it renders' test
