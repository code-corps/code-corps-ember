import { moduleForModel, test } from 'ember-qunit';

moduleForModel('preview-user-mention', 'Unit | Model | preview user mention', {
  // Specify the other units that are required for this test.
  needs: ['model:preview', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
