import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import stripeConnectButtonComponent from '../../pages/components/stripe-connect-button';

moduleForComponent('stripe-connect-button', 'Integration | Component | stripe connect button', {
  integration: true
});

test('it renders all required elements', function(assert) {
  assert.expect(2);

  let url = 'https://stripe.com';

  let page = PageObject.create(stripeConnectButtonComponent);

  page.setContext(this);
  this.set('url', url);
  this.render(hbs`{{stripe-connect-button url=url}}`);

  page.as((component) => {
    assert.equal(component.text, 'Connect with Stripe');
    assert.equal(component.href, url);
  });
});
