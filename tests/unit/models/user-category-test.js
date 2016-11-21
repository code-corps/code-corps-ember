import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('user-category', 'Unit | Model | user category', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:category']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForBelongsTo('user-category', 'category');
testForBelongsTo('user-category', 'user');
