import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from '../pages/admin';

moduleForAcceptance('Acceptance | Admin');

test('Requires authentication', function(assert) {
  assert.expect(1);

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('Redirects when not an admin', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: false, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'projects-list');
    assert.equal(page.flashMessages().count, 1, 'A flash was displayed');
  });
});

test('Correctly authorizes admins', function(assert) {
  assert.expect(1);

  let user = server.create('user', { admin: true, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'admin.index');
  });
});
