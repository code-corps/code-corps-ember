import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

/*
The payments/funds-recipient/verification-document component will take in a
stripeConnectAccount model and render several states based on its personal_id_number_status:

* `pending_requirement` - nothing
* `required` - we need your full personal ID number (form + submit)
* `verifying` - we're verifying your id number
* `verified` - nothing, parent responsible now

When it's `required`, we'll have a form for adding your full personal ID number,
and use that in combination with ember-stripe-service to create a PII token.
We'll then send a route action which which will update the StripeConnectAccount
with the token. This action will need to return a promise that can be used for
changing loading status of the button.

When it's `verifying`, we'll say something like:

    Please be patient while we verify your ID number.
*/

moduleForComponent('payments/funds-recipient/verification-document',
  'Integration | Component | payments/funds recipient/verification document', {
  integration: true
});

test('when personal_id_number_status is pending_requirement nothing renders',
  function(assert) {

  let model = Ember.Object.create({
    personal_id_number_status: 'pending_requirement'}
  );
  this.set('model', model);
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
    {{payments/funds-recipient/verification-document model=model}}
  `);

  // Nothing is rendered
  assert.equal(this.$().text().trim(), '');
});


  /*
  this.render(hbs`
    {{#payments/funds-recipient/verification-document}}
      template block text
    {{/payments/funds-recipient/verification-document}}
  `);
  assert.equal(this.$().text().trim(), 'template block text');
  */


