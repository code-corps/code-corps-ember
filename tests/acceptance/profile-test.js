import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import userProfile from '../pages/user';

moduleForAcceptance('Acceptance | Profile');

test('it displays the user-details component with user details', function(assert) {
  assert.expect(5);

  let user = server.create('user');
  server.createList('project-user', 3, { user });

  userProfile.visit({ username: user.username });

  andThen(() => {
    assert.ok(userProfile.userDetails.isVisible, 'The user details component renders');
    assert.equal(userProfile.userDetails.twitter.text, `@${user.twitter}`, "The user's twitter renders");
    assert.equal(userProfile.userDetails.twitter.link.href, `https://twitter.com/${user.twitter}`, "The user's twitter URL renders");
    assert.equal(userProfile.userDetails.website.text, user.website, "The user's website renders");
    assert.equal(userProfile.projects().count, 3, "The user's organizations are rendered");
  });
});

test('the user can navigate to a project from the projects list', function(assert) {
  assert.expect(2);

  let { user, project } = server.create('project-user');
  userProfile.visit({ username: user.username });

  let href = `/${project.organization.slug}/${project.slug}`;

  andThen(() => {
    assert.equal(userProfile.projects(0).href, href, 'The link is rendered');
    userProfile.projects(0).click();
  });

  andThen(() => {
    assert.equal(currentURL(), href, 'You can visit the project');
  });
});
