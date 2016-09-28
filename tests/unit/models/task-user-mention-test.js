import { moduleForModel, test } from 'ember-qunit';

moduleForModel('task-user-mention', 'Unit | Model | task user mention', {
  // Specify the other units that are required for this test.
  needs: ['model:task', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
