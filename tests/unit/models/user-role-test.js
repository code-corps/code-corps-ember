import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
} = Ember;

moduleForModel('user-role', 'Unit | Model | user role', {
  // Specify the other units that are required for this test.
  needs: ['model:role', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should belong to a role', function(assert) {
  assert.expect(2);

  const userRole = this.store().modelFor('user-role');
  const relationship = get(userRole, 'relationshipsByName').get('role');

  assert.equal(relationship.key, 'role', 'has relationship with role');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('it should belong to a user', function(assert) {
  assert.expect(2);

  const userRole = this.store().modelFor('user-role');
  const relationship = get(userRole, 'relationshipsByName').get('user');

  assert.equal(relationship.key, 'user', 'has relationship with user');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
