import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForHasMany } from '../../helpers/relationship';

moduleForModel('category', 'Unit | Model | category', {
  // Specify the other units that are required for this test.
  needs: [
    'model:project-category',
    'model:user-category'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('category', ['description', 'name', 'slug']);
testForHasMany('category', 'projectCategories');
testForHasMany('category', 'userCategories');
