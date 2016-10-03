import { moduleForModel, test } from 'ember-qunit';
import { testForHasMany } from '../../helpers/relationship';

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
  assert.expect(15);

  const user = this.subject();
  const attributes = Object.keys(user.toJSON());

  assert.ok(attributes.includes('base64PhotoData'), 'should have base64PhotoData attribute');
  assert.ok(attributes.includes('biography'), 'should have biography attribute');
  assert.ok(attributes.includes('email'), 'should have email attribute');
  assert.ok(attributes.includes('firstName'), 'should have firstName attribute');
  assert.ok(attributes.includes('insertedAt'), 'should have insertedAt attribute');
  assert.ok(attributes.includes('lastName'), 'should have lastName attribute');
  assert.ok(attributes.includes('name'), 'should have name attribute');
  assert.ok(attributes.includes('password'), 'should have password attribute');
  assert.ok(attributes.includes('photoLargeUrl'), 'should have photoLargeUrl attribute');
  assert.ok(attributes.includes('photoThumbUrl'), 'should have photoThumbUrl attribute');
  assert.ok(attributes.includes('state'), 'should have state attribute');
  assert.ok(attributes.includes('stateTransition'), 'should have stateTransition attribute');
  assert.ok(attributes.includes('twitter'), 'should have twitter attribute');
  assert.ok(attributes.includes('username'), 'should have username attribute');
  assert.ok(attributes.includes('website'), 'should have website attribute');
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
