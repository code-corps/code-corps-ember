import { moduleForModel, test } from 'ember-qunit';

moduleForModel('member', 'Unit | Model | member', {
  // Specify the other units that are required for this test.
  needs: ['model:model']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
