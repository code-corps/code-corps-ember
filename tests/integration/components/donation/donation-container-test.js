import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donation/donation-container', 'Integration | Component | donation/donation container', {
  integration: true
});

test('it renders no project error when no project is passed in', function(assert) {
  assert.expect(1);

  this.render(hbs`{{donation/donation-container}}`);

  let mainContent = this.$().find('p').eq(0);
  assert.equal(mainContent.text().trim(), 'No project selected.');
});

test('it renders donation amount and frequency', function(assert) {
  assert.expect(1);
  this.set('projectTitle', 'Funtown');

  this.render(hbs`{{donation/donation-container projectTitle=projectTitle}}`);

  let mainContent = this.$().find('p').eq(0);
  assert.ok(mainContent.text().match('Your payment method will be charged'));
});

test('it renders donation amount and frequency', function(assert) {
  assert.expect(1);
  this.set('amount', 100);

  this.render(hbs`{{donation/donation-container donationAmount=amount}}`);

  let donationInfo = this.$().find('h4').eq(0);
  assert.equal(donationInfo.text().trim(), '$100.00');
});
