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

  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_user' });
  sluggedRoute.createModel({ username: 'test_user' }, 'user');
  sluggedRoute.save();

  visit('/test_user');
  andThen(function() {
    assert.equal(find('.user-details').length, 1, 'user-details component is rendered');
  });
});

test("It renders organization details when the sluggedRoute model is an organization", function(assert) {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization' });
  sluggedRoute.createModel({ slug: 'test_organization' }, 'organization');
  sluggedRoute.save();

  visit('/test_organization');
  andThen(function() {
    assert.equal(find('.organization-details').length, 1, 'organization-details component is rendered');
  });
});
