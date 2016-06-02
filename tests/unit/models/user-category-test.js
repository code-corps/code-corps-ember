import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-category', 'Unit | Model | user category', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:category']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
