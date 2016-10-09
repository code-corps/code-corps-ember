import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('organization', 'Unit | Model | organization', {
  // Specify the other units that are required for this test.
  needs: ['model:project', 'model:user', 'model:organization-membership']
});

test('it exists', function(assert) {
  const model = this.subject();
  assert.ok(!!model);
});

test('it should have all its attributes', function(assert) {
  const category = this.subject();
  const actualAttributes = Object.keys(category.toJSON());
  const expectedAttributes = [
    'base64IconData',
    'description',
    'iconLargeUrl',
    'iconThumbUrl',
    'name',
    'slug'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

test('should have many organization members', function(assert) {
  assert.expect(2);

  const organization = this.store().modelFor('organization');
  const relationship = Ember.get(organization, 'relationshipsByName').get('organizationMemberships');

  assert.equal(relationship.key, 'organizationMemberships', 'has relationship with organization');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});

test('should have many projects', function(assert) {
  assert.expect(2);

  const organization = this.store().modelFor('organization');
  const relationship = Ember.get(organization, 'relationshipsByName').get('projects');

  assert.equal(relationship.key, 'projects', 'has relationship with organization');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});

test('should have computer properties for pending memberships', function(assert) {
  assert.expect(3);

  let organization;
  const members = [];

  Ember.run(() => {
    organization = this.store().createRecord('organization');
    members.push(this.store().createRecord('organization-membership', { organization, role: 'pending' }));
  });

  assert.equal(organization.get('pendingMembersCount'), 1, 'pendingMembersCount should return 1');
  assert.equal(organization.get('hasPendingMembers'), true, 'hasPendingMembers should return true');
  assert.deepEqual(organization.get('pendingMemberships'), members, 'pendingMemberships should only return pending members');
});
