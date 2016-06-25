import { moduleForModel, test } from 'ember-qunit';

moduleForModel('organization', 'Unit | Model | organization', {
  // Specify the other units that are required for this test.
  needs: ['model:project', 'model:user', 'model:organization-membership']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
