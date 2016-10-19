import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const {
  get,
  set,
  run
} = Ember;

moduleForModel('organization-membership', 'Unit | Model | organization membership', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('organization-membership');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'role'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForBelongsTo('organization-membership', 'member');
testForBelongsTo('organization-membership', 'organization');

test('isAdmin should compute if the role is admin', function(assert) {
  assert.expect(2);

  let organizationMembership = this.subject({ role: 'contributor' });
  assert.notOk(get(organizationMembership, 'isAdmin'), 'isAdmin should be false');
  run(() => {
    set(organizationMembership, 'role', 'admin');
  });
  assert.ok(get(organizationMembership, 'isAdmin'), 'isAdmin should be true');
});

test('isContributor should compute if the role is contributor', function(assert) {
  assert.expect(2);

  let organizationMembership = this.subject({ role: 'admin' });
  assert.notOk(get(organizationMembership, 'isContributor'), 'isContributor should be false');
  run(() => {
    set(organizationMembership, 'role', 'contributor');
  });
  assert.ok(get(organizationMembership, 'isContributor'), 'isContributor should be true');
});

test('isOwner should compute if the role is owner', function(assert) {
  assert.expect(2);

  let organizationMembership = this.subject({ role: 'contributor' });
  assert.notOk(get(organizationMembership, 'isOwner'), 'isOwner should be false');
  run(() => {
    set(organizationMembership, 'role', 'owner');
  });
  assert.ok(get(organizationMembership, 'isOwner'), 'isOwner should be true');
});

test('isPending should compute if the role is pending', function(assert) {
  assert.expect(2);

  let organizationMembership = this.subject({ role: 'contributor' });
  assert.notOk(get(organizationMembership, 'isPending'), 'isPending should be false');
  run(() => {
    set(organizationMembership, 'role', 'pending');
  });
  assert.ok(get(organizationMembership, 'isPending'), 'isPending should be true');
});
