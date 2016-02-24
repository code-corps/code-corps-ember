import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Organization', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("it displays the organization-details component with user details", (assert) => {
  assert.expect(5);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
  }, 'Organization');
  sluggedRoute.save();

  organization.save();

  visit(organization.slug);
  andThen(() => {
    assert.equal(find('.organization-details').length, 1);
  });
});