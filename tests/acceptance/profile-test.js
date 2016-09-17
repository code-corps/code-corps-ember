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
  assert.expect(5);

  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_user' });

  let user = sluggedRoute.createUser({
    username: 'test_user',
    slug: 'test_user',
    twitter: 'test_twitter',
    website: 'test.com',
  });

  sluggedRoute.save();

  for(let i = 1; i <= 3; i++) {
    server.create('organization-membership', {
      member: user,
      organization: server.create('organization')
    });
  }

  visit(user.username);
  andThen(() => {
    assert.equal(find('.user-details').length, 1);
    assert.equal(find('.user-details .twitter').text().trim(), '@test_twitter', "The user's twitter renders");
    assert.equal(find('.user-details .twitter a').attr('href'), 'https://twitter.com/test_twitter', "The user's twitter URL renders");
    assert.equal(find('.website').text().trim(), 'test.com', "The user's website renders");
    assert.equal(find('.user-organization-item').length, 3, "The user's organizations are rendered");
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

  visit(user.username);

  let href = `/${organization.slug}`;

  andThen(() => {
    assert.equal(find('.user-organization-item:eq(0) a').attr('href'), href, 'The link is rendered');
    click('.user-organization-item:eq(0) a');
  });

  andThen(() => {
    assert.equal(currentURL(), href, 'You can visit the organization');
  });
});
