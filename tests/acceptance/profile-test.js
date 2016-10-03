import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import userProfile from '../pages/user';

let application;

module('Acceptance: Profile', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('it displays the user-details component with user details', (assert) => {
  assert.expect(5);

  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_user' });

  let user = sluggedRoute.createUser({
    username: 'test_user',
    slug: 'test_user',
    twitter: 'test_twitter',
    website: 'test.com',
  });

  sluggedRoute.save();

  server.createList('organization-membership', 3, { member: user, organization: server.create('organization')});

  userProfile.visit({ username: user.username });

  andThen(() => {
    assert.equal(userProfile.userDetails.isVisible, true, 'The user details component renders');
    assert.equal(userProfile.userDetails.twitter.text, `@${user.twitter}`, "The user's twitter renders");
    assert.equal(userProfile.userDetails.twitter.link.href, 'https://twitter.com/test_twitter', "The user's twitter URL renders");
    assert.equal(userProfile.userDetails.website.text, 'test.com', "The user's website renders");
    assert.equal(userProfile.organizations().count, 3, "The user's organizations are rendered");
  });
});

test('the user can navigate to an organization from the organizations list', (assert) => {
  assert.expect(2);

  let userRoute = server.create('slugged-route', { slug: 'andor_drakon' });
  let user = userRoute.createUser({ username: 'andor_drakon' });
  userRoute.save();

  let organizationRoute = server.create('slugged-route', { slug: 'chaos_inc' });
  let organization = organizationRoute.createOrganization({ title: 'Chaos Inc.', slug: 'chaos_inc' });
  organizationRoute.save();

  server.create('organization-membership', { member: user, organization: organization });

  userProfile.visit({ username: user.username });

  let href = `/${organization.slug}`;

  andThen(() => {
    assert.equal(userProfile.organizations(0).href, href, 'The link is rendered');
    userProfile.organizations(0).click();
  });

  andThen(() => {
    assert.equal(currentURL(), href, 'You can visit the organization');
  });
});
