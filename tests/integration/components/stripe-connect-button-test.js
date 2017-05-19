import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stripe-connect-button', 'Integration | Component | stripe connect button', {
  integration: true
});

test('it renders all required elements', function(assert) {
  assert.expect(2);

  let url = 'https://stripe.com';

  this.set('url', url);
  this.render(hbs`{{stripe-connect-button url=url}}`);

  this.$('.stripe-connect').as((component) => {
    assert.equal(component.attr('href'), url);
    assert.equal(component.text(), 'Connect with Stripe');
  });
});
