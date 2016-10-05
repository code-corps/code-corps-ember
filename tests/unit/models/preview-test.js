import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
import '../../helpers/has-attributes';

const {
  get,
} = Ember;

moduleForModel('preview', 'Unit | Model | preview', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:preview-user-mention']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
   let preview = this.subject();
   let actualAttributes = Object.keys(preview.toJSON());
   let expectedAttributes = [
     "body",
     "markdown",
     "user"
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
