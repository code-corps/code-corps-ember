import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Member', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("It renders user details when the member model is a user", function(assert) {
  assert.expect(1);

  let member = server.schema.member.create({ slug: 'test_user' });
  member.createModel({ username: 'test_user' }, 'user');
  member.save();

  visit('/test_user');
  andThen(function() {
    assert.equal(find('.member-details .user-details').length, 1, 'user-details component is rendered');
  });
});

test("It renders organization details when the member model is an organization", function(assert) {
  assert.expect(1);

  let member = server.schema.member.create({ slug: 'test_organization' });
  member.createModel({ slug: 'test_organization' }, 'organization');
  member.save();

  visit('/test_organization');
  andThen(function() {
    assert.equal(find('.member-details .organization-details').length, 1, 'organization-details component is rendered');
  });
});
