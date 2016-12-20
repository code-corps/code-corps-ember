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
    personal_id_number_status: 'pending_requirement'
  });
  this.set('model', model);

  this.render(hbs`
    {{payments/funds-recipient/verification-document model=model}}
  `);

  // Nothing is rendered
  assert.equal(this.$('form').text().trim(), '', 'inner text is empty');
  assert.equal(this.$('form input').length, 0, 'no input');
  assert.equal(this.$('form button[type="submit"]').length, 0, 'no submit button');
});

test('when personal_id_number_status is required, can submit an id number',
  function(assert) {

  let model = Ember.Object.create({
    personal_id_number_status: 'required'
  });
  this.set('model', model);

  this.render(hbs`
    {{payments/funds-recipient/verification-document model=model}}
  `);

  assert.notEqual(this.$('form').text().trim(), '', 'inner text is not empty');
  assert.equal(this.$('form input').length, 1, 'shows an input');
  assert.equal(this.$('form button[type="submit"]').length, 1, 'shows submit button');
});

test('when personal_id_number_status is verifying, a message is shown', function(assert) {
  let model = Ember.Object.create({
    personal_id_number_status: 'verifying'
  });
  this.set('model', model);

  this.render(hbs`
    {{payments/funds-recipient/verification-document model=model}}
  `);

  assert.notEqual(this.$('form').text().trim(), '', 'inner text is not empty');
  assert.equal(this.$('form input').length, 0, 'no input');
  assert.equal(this.$('form button[type="submit"]').length, 0, 'no submit button');
});

test('when personal_id_number_status is verified, nothing is shown', function(assert) {
  let model = Ember.Object.create({
    personal_id_number_status: 'verified'
  });
  this.set('model', model);

  this.render(hbs`
    {{payments/funds-recipient/verification-document model=model}}
  `);

  assert.equal(this.$('form').text().trim(), '', 'inner text is empty');
  assert.equal(this.$('form input').length, 0, 'no input');
  assert.equal(this.$('form button[type="submit"]').length, 0, 'no submit button');
});

test('sends an action on submit with personal id number value', function(assert) {
  let done = assert.async();

  let model = Ember.Object.create({
    personal_id_number_status: 'required'
  });
  this.set('model', model);
  this.set('onSubmit', (id) => {
    assert.equal(id, idValue, `${idValue} sent via action`);
    done();
    return Ember.RSVP.Promise.resolve(null);
  });

  this.render(hbs`
    {{payments/funds-recipient/verification-document model=model onSubmit=(action onSubmit)}}
  `);

  let idValue = 'PII_0123456_My-ID';
  let inputEl = this.$('input')[0];
  inputEl.value = idValue;
  let submitEl = this.$('form button[type="submit"]');

  assert.equal(this.$('form input').val(), idValue, `input value is ${idValue}`);
  submitEl.trigger('click');
});
