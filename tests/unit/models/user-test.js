import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';

moduleForModel('user', 'Unit | Model | user', {
  needs: [
    'model:project-user',
    'model:project',
    'model:stripe-connect-subscription',
    'model:stripe-platform-card',
    'model:stripe-platform-customer',
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
  'biography', 'cloudinaryPublicId', 'email', 'firstName',
  'githubAvatarUrl', 'githubId', 'githubUsername',
  'insertedAt', 'lastName', 'name', 'password', 'photoLargeUrl',
  'photoThumbUrl', 'signUpContext', 'state', 'stateTransition', 'twitter',
  'username', 'website'
]);

testForBelongsTo('user', 'stripePlatformCard');

testForHasMany('project', 'projectUsers');
testForHasMany('user', 'stripeConnectSubscriptions');
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
