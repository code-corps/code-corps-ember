import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import becomeADonorComponent from '../../../pages/components/donations/become-a-donor';

const {
  K
} = Ember;

let page = PageObject.create(becomeADonorComponent);

function setHandler(context, becomeADonorHandler = K) {
  context.set('becomeADonorHandler', becomeADonorHandler);
}

moduleForComponent('donations/become-a-donor', 'Integration | Component | donations/become a donor', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders button', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/become-a-donor class="donation-status__become-a-donor" becomeADonor=becomeADonorHandler}}`);

  assert.ok(page.rendersButton, 'The component button is rendered');
});

test('it calls action when button is clicked', function(assert) {
  assert.expect(1);

  function becomeADonorHandler() {
    assert.ok(true, 'Action was called on click.');
  }

  setHandler(this, becomeADonorHandler);

  page.render(hbs`{{donations/become-a-donor class="donation-status__become-a-donor" becomeADonor=becomeADonorHandler}}`);

  page.clickButton();
});
