import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Logging in', function(assert) {
  assert.expect(1);
  visit('/login');
  fillIn('#identification', 'josh@coderly.com');
  fillIn('#password', 'password');
  click('#login');
  andThen(function() {
    assert.equal(find('a').text(), 'Logout', 'Page contains logout link');
  });
});

test('Login failure', function(assert) {
  assert.expect(2);
  visit('/login');

  andThen(() => {
    fillIn('#identification', 'josh@coderly.com');
    fillIn('#password', 'wrongpassword');
    click('#login');
  });

  andThen(function() {
    assert.equal(find('.error').length, 1);
    assert.equal(find('.error').text(), 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.', 'Page contains login error');
  });
});

test('When logging in from /:memberSlug/:projectSlug, the redirect back to the previous route should work', (assert) => {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization' });
  let organization = server.schema.organization.create({ slug: 'test_organization' });
  sluggedRoute.model = organization;
  sluggedRoute.save();

  organization.createProject({ slug: 'test_project' });
  organization.save();

  visit('/test_organization/test_project/posts');

  click('.login');
  andThen(() => {
    fillIn('#identification', 'josh@coderly.com');
    fillIn('#password', 'password');
    click('#login');
  });

  andThen(() => {
    assert.equal(currentURL(), '/test_organization/test_project/posts');
  });
});
