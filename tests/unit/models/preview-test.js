import { moduleForModel, test } from 'ember-qunit';
import '../../helpers/has-attributes';
import Ember from 'ember';

const {
  get,
} = Ember;

moduleForModel('preview', 'Unit | Model | preview', {
  // Specify the other units that are required for this test.
  needs: [
    'model:preview-user-mention',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('preview');
  let actualAttributes = Ember.get(model, 'attributes');

  let expectedAttributes = [
    "body",
    "markdown"
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

test('should belong to a user', function(assert) {
  assert.expect(2);

  const preview = this.store().modelFor('preview');
  const relationship = get(preview, 'relationshipsByName').get('user');

  assert.equal(relationship.key, 'user', 'has relationship with user');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should have many preview-user-mention', function(assert) {
  assert.expect(2);

  const preview = this.store().modelFor('preview');
  const relationship = get(preview, 'relationshipsByName').get('previewUserMentions');

  assert.equal(relationship.key, 'previewUserMentions', 'has relationship with preview-user-mention');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
