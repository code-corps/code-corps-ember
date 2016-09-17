import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Slugged Route', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("It renders user details when the sluggedRoute model is a user", function(assert) {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_user' });
  sluggedRoute.createUser({ username: 'test_user' });
  sluggedRoute.save();

  visit('/test_user');
  andThen(function() {
    assert.equal(find('.user-details').length, 1, 'user-details component is rendered');
  });
});

test("It renders organization profile when the sluggedRoute model is an organization", function(assert) {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  sluggedRoute.createOrganization({ slug: 'test_organization' });
  sluggedRoute.save();

  visit('/test_organization');
  andThen(function() {
    assert.equal(find('.organization-profile').length, 1, 'organization-profile component is rendered');
  });
});

test("It renders a 404 error when no slugged route exists", function(assert) {
  assert.expect(5);

  server.get('/no_slug',
    {
      errors: [{
        id: "RECORD_NOT_FOUND",
        title: "Record not found",
        detail: "Couldn't find SluggedRoute",
        status: 404
      }]
    },
    404);

  visit('/no_slug');
  andThen(function() {
    assert.equal(find('.error-wrapper').length, 1, 'error-wrapper component is rendered');
    assert.equal(find('.error-wrapper h1').text(), '404 Error', 'The 404 title is rendered');
    assert.ok($('html').hasClass('warning'), 'The class of the html element is correct');
    click('.error-wrapper a');
  });

  andThen(function() {
    assert.equal(find('.error-wrapper').length, 0, 'error-wrapper component is not rendered');
    assert.notOk($('html').hasClass('warning'), 'The class of the html element is unset');
  });
});
