import { moduleForModel, test } from 'ember-qunit';

moduleForModel('organization-membership', 'Unit | Model | organization membership', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:organization']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
