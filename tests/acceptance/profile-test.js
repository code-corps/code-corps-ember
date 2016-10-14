import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import createUserWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-user-with-slugged-route';
import userProfile from '../pages/user';

moduleForAcceptance('Acceptance | Profile');

test('it displays the user-details component with user details', function(assert) {
  assert.expect(5);

  let user = createUserWithSluggedRoute();
  let organization = server.create('organization');
  server.createList('organization-membership', 3, { member: user, organization });

  userProfile.visit({ username: user.username });

  andThen(() => {
    assert.equal(userProfile.userDetails.isVisible, true, 'The user details component renders');
    assert.equal(userProfile.userDetails.twitter.text, `@${user.twitter}`, "The user's twitter renders");
    assert.equal(userProfile.userDetails.twitter.link.href, `https://twitter.com/${user.twitter}`, "The user's twitter URL renders");
    assert.equal(userProfile.userDetails.website.text, user.website, "The user's website renders");
    assert.equal(userProfile.organizations().count, 3, "The user's organizations are rendered");
  });
});

test('the user can navigate to an organization from the organizations list', function(assert) {
  assert.expect(2);

  let user = createUserWithSluggedRoute();
  let organization = createOrganizationWithSluggedRoute();

  server.create('organization-membership', { member: user, organization });

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
