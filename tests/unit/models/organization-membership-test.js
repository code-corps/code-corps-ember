import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from '../../helpers/relationship';
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
  assert.ok(!!model);
});

testForAttributes('organization-membership', ['role']);
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
