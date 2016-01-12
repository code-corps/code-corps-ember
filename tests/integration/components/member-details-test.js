import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('member-details', 'Integration | Component | member details', {
  integration: true
});

let organizationMember = {
  name: 'Organization',
  model: {
    name: 'organization',
    slug: 'organization',
    constructor: {
      modelName: 'organization'
    }
  }
};

let userMember = {
  name: 'User',
  model: {
    username: 'user',
    constructor: {
      modelName: 'user'
    }
  }
};

test('it renders', function(assert) {
  this.render(hbs`{{member-details}}`);
  assert.equal(this.$('.member-details').length, 1);
});

test('when the member is an organization, it renders the organization component', function(assert) {
  assert.expect(1);

  this.set('member', organizationMember);
  this.render(hbs`{{member-details member=member}}`);

  assert.equal(this.$('.organization-details').length, 1);
});


test('when the member is a user, it renders the user component', function(assert) {
  assert.expect(1);

  this.set('member', userMember);
  this.render(hbs`{{member-details member=member}}`);

  assert.equal(this.$('.user-details').length, 1);
});
