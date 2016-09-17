import { moduleForModel, test } from 'ember-qunit';

moduleForModel('slugged-route', 'Unit | Model | slugged-route', {
  // Specify the other units that are required for this test.
  needs: ['model:organization', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
