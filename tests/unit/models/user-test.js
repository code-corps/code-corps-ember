import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForHasMany } from '../../helpers/relationship';

moduleForModel('user', 'Unit | Model | user', {
  needs: [
    'model:organization-membership',
    'model:stripe-subscription',
    'model:user-category',
    'model:user-role',
    'model:user-skill'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('user', [
  'base64PhotoData', 'biography', 'email', 'firstName', 'insertedAt',
  'lastName', 'name', 'password', 'photoLargeUrl', 'photoThumbUrl',
  'state', 'stateTransition', 'twitter', 'username', 'website'
]);

testForHasMany('user', 'organizationMemberships');
testForHasMany('user', 'subscriptions');
testForHasMany('user', 'userCategories');
testForHasMany('user', 'userRoles');
testForHasMany('user', 'userSkills');

test('it correctly adds at in the username', function(assert) {
  assert.expect(1);

  let model = this.subject({ username: 'johndoe' });

  assert.equal(model.get('atUsername'), '@johndoe');
});

test('it correctly returns twitterUrl', function(assert) {
  assert.expect(1);

  let model = this.subject({ twitter: 'johndoe' });

  assert.equal(model.get('twitterUrl'), 'https://twitter.com/johndoe');
});
