import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Organization Settings – Profile', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("it requires authentication", (assert) => {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    slug: 'test_organization',
  }, 'Organization');
  sluggedRoute.save();

  let url = "organizations/" + organization.slug + "/settings/profile";

  visit(url);
  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test("it allows editing of organization profile", (assert) => {
  assert.expect(4);

  var user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    slug: 'test_organization',
  }, 'Organization');
  sluggedRoute.save();

  let url = "organizations/" + organization.slug + "/settings/profile";

  visit(url);
  andThen(() => {
    fillIn('input[name=name]', 'Test User');
    fillIn('input[name=description]', 'Lorem edit');
    click('.save');
  });

  let done = assert.async();

  server.patch('/organizations/1', (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;

    assert.equal(params.name, 'Test User');
    assert.equal(params.description, 'Lorem edit');
    done();

    return {
      data: {
        id: organization.id,
        type: "organizations",
        attributes: params
      }
    };
  });

  andThen(() => {
    assert.equal(find('.alert-success').length, 1);
    assert.equal(find('.alert-success p').text(), "Organization updated successfully");
  });
});
