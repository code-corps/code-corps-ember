import { moduleForModel, test } from 'ember-qunit';

moduleForModel('comment-user-mention', 'Unit | Model | comment user mention', {
  // Specify the other units that are required for this test.
  needs: ['model:comment', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
