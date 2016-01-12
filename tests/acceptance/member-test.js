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

  let user = server.create('user');
  server.create('member', { slug: 'test_member', model: user });

  visit('/test_member');
  andThen(function() {
    assert.equal(find('.member-details .user-details').length, 1, 'user-details component is rendered');
  });
});

test("It renders organization details when the member model is an organization", function(assert) {
  assert.expect(1);

  let organization = server.create('organization');
  server.create('member', { slug: 'test_member', model: organization });

  visit('/test_member');
  andThen(function() {
    assert.equal(find('.member-details .organization-details').length, 1, 'organization-details component is rendered');
  });
});
