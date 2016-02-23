import Ember from "ember";
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

test("it displays the user-details component with user details", (assert) => {
  assert.expect(5);

  let sluggedRoute = server.schema.sluggedRoute.create({
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
      name: `Organization ${i}`,
    });
  }

  user.save();

  visit(user.username);
  andThen(() => {
    assert.equal(find('.user-details').length, 1);
    assert.equal(find('.twitter').text().trim(), "@test_twitter", "The user's twitter renders");
    assert.equal(find('.website').text().trim(), "test.com", "The user's website renders");
    assert.equal(find('.user-organization-item').length, 3, "The user's organizations are rendered");
    assert.equal(find('.user-organization-item:eq(0)').text().trim(), "Organization 1", "The organization names render");
  });
});

test("it displays the user-details component with user details", (assert) => {
  assert.expect(2);

  let sluggedRoute = server.schema.sluggedRoute.create({
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
    let organizationRoute = server.schema.sluggedRoute.create({
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
    assert.equal(find('.user-organization-item:eq(0) a').attr('href'), "/organization_1", "The organization links render");
    click('.user-organization-item:eq(0) a');
  });
  andThen(() => {
    assert.equal(find('.organization-details').length, 1, "You can visit the organization");
  });
});
