import { moduleForModel, test } from 'ember-qunit';
import { testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const {
  get,
  run
} = Ember;

moduleForModel('organization', 'Unit | Model | organization', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization-membership',
    'model:project',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('organization');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'base64IconData',
    'description',
    'iconLargeUrl',
    'iconThumbUrl',
    'name',
    'slug'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForHasMany('organization', 'organizationMemberships');
testForHasMany('organization', 'projects');

test('it should have computed properties for its organization\'s members', function(assert) {
  assert.expect(2);

  let store = this.store();
  let model = this.subject();

  run(function() {
    store.createRecord('organization-membership', { organization: model, role: 'pending' });
  });

  assert.equal(model.get('pendingMembersCount'), 1, 'pendingMembersCount should return 1');
  assert.equal(model.get('hasPendingMembers'), true, 'hasPendingMembers should return true');
});
