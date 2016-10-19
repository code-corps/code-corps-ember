import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('user-skill', 'Unit | Model | user skill', {
  // Specify the other units that are required for this test.
  needs: ['model:skill', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testForBelongsTo('user-skill', 'skill');
testForBelongsTo('user-skill', 'user');
