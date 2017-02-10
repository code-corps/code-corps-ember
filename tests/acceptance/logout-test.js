import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import indexPage from '../pages/index';

moduleForAcceptance('Acceptance | Logout');

test('Logging out', function(assert) {
  assert.expect(2);
  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });
  indexPage.visit();
  andThen(function() {
    indexPage.navMenu.userMenu.toggle();
  });
  andThen(function() {
    assert.ok(indexPage.navMenu.userMenu.logoutLinkVisible, 'Page contains logout link');
    indexPage.navMenu.userMenu.logOut();
  });
  andThen(function() {
    assert.ok(indexPage.navMenu.loginLinkVisible, 'Page contains login link');
  });
});
