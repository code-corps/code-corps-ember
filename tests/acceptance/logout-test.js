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
    assert.equal(indexPage.navMenu.userMenu.logOut.text, 'Log out', 'Page contains logout link');
    indexPage.navMenu.userMenu.logOut.click();
  });
  andThen(function() {
    assert.equal(indexPage.navMenu.logIn.text, 'Sign in', 'Page contains login link');
  });
});
