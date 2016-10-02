import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
} = Ember;

moduleForModel('project-skill', 'Unit | Model | project skill', {
  // Specify the other units that are required for this test.
  needs: ['model:project', 'model:skill']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('should belong to a project', function(assert) {
  assert.expect(2);

  const projectSkill = this.store().modelFor('project-skill');
  const relationship = get(projectSkill, 'relationshipsByName').get('project');

  assert.equal(relationship.key, 'project', 'has relationship with project');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should belong to a skill', function(assert) {
  assert.expect(2);

  const projectSkill = this.store().modelFor('project-skill');
  const relationship = get(projectSkill, 'relationshipsByName').get('skill');

  assert.equal(relationship.key, 'skill', 'has relationship with skill');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
