import { moduleForModel, test } from 'ember-qunit';

moduleForModel('category', 'Unit | Model | category', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:user-category']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
