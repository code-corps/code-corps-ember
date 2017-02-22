import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import createUserWithSluggedRoute from 'code-corps-ember/mirage/helpers/create-user-with-slugged-route';
import sluggedRoutePage from '../pages/slugged-route';

moduleForAcceptance('Acceptance | Slugged Route');

test('It renders user details when the sluggedRoute model is a user', function(assert) {
  assert.expect(1);

  let user = createUserWithSluggedRoute(server);

  sluggedRoutePage.visit({ slug: user.username });

  andThen(function() {
    assert.ok(sluggedRoutePage.userDetails.isVisible, 'user-details component is rendered');
  });
});

test('It renders organization profile when the sluggedRoute model is an organization', function(assert) {
  assert.expect(1);

  let organization = createOrganizationWithSluggedRoute();

  sluggedRoutePage.visit({ slug: organization.slug });

  andThen(function() {
    assert.ok(sluggedRoutePage.organizationProfile.isVisible, 'organization-profile component is rendered');
  });
});

test('It renders a 404 error when no slugged route exists', function(assert) {
  assert.expect(5);

  server.get('/no_slug',
    {
      errors: [{
        id: 'RECORD_NOT_FOUND',
        title: 'Record not found',
        detail: "Couldn't find SluggedRoute",
        status: 404
      }]
    },
    404);

  sluggedRoutePage.visit({ slug: 'no_slug' });

  andThen(function() {
    assert.ok(sluggedRoutePage.errorWrapper.isVisible, 'error-wrapper component is rendered');
    assert.equal(sluggedRoutePage.errorWrapper.title, '404 Error', 'The 404 title is rendered');
    assert.ok($('html').hasClass('warning'), 'The class of the html element is correct');
    sluggedRoutePage.errorWrapper.clickLink();
  });

  andThen(function() {
    assert.notOk(sluggedRoutePage.errorWrapper.isVisible, 'error-wrapper component is not rendered');
    assert.notOk($('html').hasClass('warning'), 'The class of the html element is unset');
  });
});
