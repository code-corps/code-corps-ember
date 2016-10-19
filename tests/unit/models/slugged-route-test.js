import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('slugged-route', 'Unit | Model | slugged-route', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('should have all of its attributes', function(assert) {
  let model = this.store().modelFor('slugged-route');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'slug'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

// slugged-route may belong to either a user or organization, but not both
// at the same time.
testForBelongsTo('slugged-route', 'organization');
testForBelongsTo('slugged-route', 'user');
