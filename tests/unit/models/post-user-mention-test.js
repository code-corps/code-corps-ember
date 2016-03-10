import { moduleForModel, test } from 'ember-qunit';

moduleForModel('post-user-mention', 'Unit | Model | post user mention', {
  // Specify the other units that are required for this test.
  needs: ['model:post', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
