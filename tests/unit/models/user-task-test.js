import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-task', 'Unit | Model | user task', {
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
