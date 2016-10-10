import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

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
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'body',
    'markdown'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForBelongsTo('preview', 'user');
testForHasMany('preview', 'previewUserMentions');
