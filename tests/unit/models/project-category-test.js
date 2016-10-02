import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
} = Ember;

moduleForModel('project-category', 'Unit | Model | project category', {
  // Specify the other units that are required for this test.
  needs: ['model:project', 'model:category']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should belong to a category', function(assert) {
  assert.expect(2);

  const projectCategory = this.store().modelFor('project-category');
  const relationship = get(projectCategory, 'relationshipsByName').get('category');

  assert.equal(relationship.key, 'category', 'has relationship with category');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('it should belong to a project', function(assert) {
  assert.expect(2);

  const projectCategory = this.store().modelFor('project-category');
  const relationship = get(projectCategory, 'relationshipsByName').get('project');

  assert.equal(relationship.key, 'project', 'has relationship with project');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
