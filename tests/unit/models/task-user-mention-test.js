import { moduleForModel, test } from 'ember-qunit';
import '../../helpers/has-attributes';
import Ember from 'ember';

const {
  get
} = Ember;

moduleForModel('task-user-mention', 'Unit | Model | task user mention', {
  // Specify the other units that are required for this test.
  needs: [
    'model:task',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('task-user-mention');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'indices',
    'username'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});
