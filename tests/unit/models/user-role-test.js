import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('user-role', 'Unit | Model | user role', {
  // Specify the other units that are required for this test.
  needs: ['model:role', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForBelongsTo('user-role', 'role');
testForBelongsTo('user-role', 'user');
