import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('member-details', 'Integration | Component | member details', {
  integration: true,
});

test('it renders', function(assert) {
  this.render(hbs`{{member-details}}`);
  assert.equal(this.$('.member-details').length, 1);
});

test('when the member is an organization, it renders the organization component', function(assert) {
  assert.expect(1);

  let member = { modelType: 'organization' };

  this.set('member', member);
  this.render(hbs`{{member-details member=member}}`);

  assert.equal(this.$('.organization-details').length, 1);
});


test('when the member is a user, it renders the user component', function(assert) {
  assert.expect(1);

  let member = { modelType: 'user' };

  this.set('member', member);
  this.render(hbs`{{member-details member=member}}`);

  assert.equal(this.$('.user-details').length, 1);
});
