import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
} = Ember;

moduleForModel('user-skill', 'Unit | Model | user skill', {
  // Specify the other units that are required for this test.
  needs: ['model:skill', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should belong to a skill', function(assert) {
  assert.expect(2);

  const userSkill = this.store().modelFor('user-skill');
  const relationship = get(userSkill, 'relationshipsByName').get('skill');

  assert.equal(relationship.key, 'skill', 'has relationship with skill');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('it should belong to a user', function(assert) {
  assert.expect(2);

  const userSkill = this.store().modelFor('user-skill');
  const relationship = get(userSkill, 'relationshipsByName').get('user');

  assert.equal(relationship.key, 'user', 'has relationship with user');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
