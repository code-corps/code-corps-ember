import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import sluggedRoutePage from '../pages/slugged-route';

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

  sluggedRoutePage.visit({ slug: 'test_user' });

  andThen(function() {
    assert.equal(sluggedRoutePage.userDetails.isVisible, true, 'user-details component is rendered');
  });
});

test("It renders organization profile when the sluggedRoute model is an organization", function(assert) {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  sluggedRoute.createOrganization({ slug: 'test_organization' });
  sluggedRoute.save();

  sluggedRoutePage.visit({ slug: 'test_organization' });

  andThen(function() {
    assert.equal(sluggedRoutePage.organizationProfile.isVisible, true, 'organization-profile component is rendered');
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

  sluggedRoutePage.visit({ slug: 'no_slug' });

  andThen(function() {
    assert.equal(sluggedRoutePage.errorWrapper.isVisible, true, 'error-wrapper component is rendered');
    assert.equal(sluggedRoutePage.errorWrapper.title.text, '404 Error', 'The 404 title is rendered');
    assert.equal($('html').hasClass('warning'), true, 'The class of the html element is correct');
    sluggedRoutePage.errorWrapper.clickLink();
  });

  andThen(function() {
    assert.equal(sluggedRoutePage.errorWrapper.isVisible, false, 'error-wrapper component is not rendered');
    assert.equal($('html').hasClass('warning'), false, 'The class of the html element is unset');
  });
});
