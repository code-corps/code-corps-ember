import { moduleForModel, test } from 'ember-qunit';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('comment-user-mention', 'Unit | Model | comment user mention', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('comment-user-mention');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'indices',
    'username'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});
