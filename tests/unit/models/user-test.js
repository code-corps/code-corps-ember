import { moduleForModel, test } from 'ember-qunit';
import { testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization',
    'model:organization-membership',
    'model:user-category',
    'model:user-role',
    'model:user-skill'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has all of its attributes', function(assert) {
  let model = this.store().modelFor('user');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'base64PhotoData',
    'biography',
    'email',
    'firstName',
    'insertedAt',
    'lastName',
    'name',
    'password',
    'photoLargeUrl',
    'photoThumbUrl',
    'state',
    'stateTransition',
    'twitter',
    'username',
    'website'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForHasMany('user', 'organizationMemberships');
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
