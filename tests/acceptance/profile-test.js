import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

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
  assert.expect(6);

  let sluggedRoute = server.schema.sluggedRoutes.create({
    slug: 'test_user',
  });
  let user = sluggedRoute.createOwner({
    username: 'test_user',
    slug: 'test_user',
    twitter: 'test_twitter',
    website: 'test.com',
  }, 'User');
  sluggedRoute.save();

  for(let i = 1; i <= 3; i++) {
    user.createOrganization({
      slug: `organization_${i}`,
      name: `Organization ${i}`
    });
  }

  user.save();

  visit(user.username);
  andThen(() => {
    assert.equal(find('.user-details').length, 1);
    assert.equal(find('.twitter').text().trim(), '@test_twitter', "The user's twitter renders");
    assert.equal(find('.twitter a').attr('href'), 'https://twitter.com/test_twitter', "The user's twitter URL renders");
    assert.equal(find('.website').text().trim(), 'test.com', "The user's website renders");
    assert.equal(find('.user-organization-item').length, 3, "The user's organizations are rendered");
    let renderedNames = find('.user-organization-item').map((index, item) => find(item).text().trim()).toArray();
    let expectedNames = ['Organization 1', 'Organization 2', 'Organization 3'];
    assert.deepEqual(renderedNames, expectedNames, 'The organization names render');
  });
});

test('the user can navigate to an organization from the organizations list', (assert) => {
  assert.expect(2);

  let sluggedRoute = server.schema.sluggedRoutes.create({
    slug: 'test_user',
  });
  let user = sluggedRoute.createOwner({
    username: 'test_user',
    slug: 'test_user',
  }, 'User');
  sluggedRoute.save();

  for(let i = 1; i <= 3; i++) {
    let organization = user.createOrganization({
      slug: `organization_${i}`,
      name: `Organization ${i}`,
    });
    let organizationRoute = server.schema.sluggedRoutes.create({
      slug: organization.slug,
    });
    organizationRoute.createOwner({
      slug: organization.slug,
    }, 'Organization');
    organizationRoute.save();
  }

  user.save();

  visit(user.username);
  andThen(() => {
    assert.equal(find('.user-organization-item:eq(0) a').attr('href'), '/organization_1', 'The organization links render');
    click('.user-organization-item:eq(0) a');
  });
  andThen(() => {
    assert.equal(currentURL(), '/organization_1', 'You can visit the organization');
  });
});
