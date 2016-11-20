import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('slugged-route', 'Unit | Model | slugged-route', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('slugged-route', ['slug']);
// slugged-route may belong to either a user or organization, but not both
// at the same time.
testForBelongsTo('slugged-route', 'organization');
testForBelongsTo('slugged-route', 'user');
