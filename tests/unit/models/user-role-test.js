import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-role', 'Unit | Model | user role', {
  // Specify the other units that are required for this test.
  needs: ['model:role', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
