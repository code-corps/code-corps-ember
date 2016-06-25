import { moduleForModel, test } from 'ember-qunit';

moduleForModel('preview', 'Unit | Model | preview', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:preview-user-mention']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
