import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Integration: Member', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("It renders user details when the member model is a user", function(assert) {
  assert.expect(1);

  let user = server.create('user', { slug: 'test_user' });
  server.create('member', { slug: 'test_user', userId: user.id, modelType: 'user' });

  visit('/test_user');
  andThen(function() {
    assert.equal(find('.member-details .user-details').length, 1, 'user-details component is rendered');
  });
});

test("It renders organization details when the member model is an organization", function(assert) {
  assert.expect(1);

  let organization = server.create('organization', { slug: 'test_organization' });
  server.create('member', { slug: 'test_organization', organizationId: organization.id, modelType: 'organization' });

  visit('/test_organization');
  andThen(function() {
    assert.equal(find('.member-details .organization-details').length, 1, 'organization-details component is rendered');
  });
});
