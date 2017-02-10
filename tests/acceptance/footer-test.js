import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index';

moduleForAcceptance('Acceptance | footer');

test('can visit links from footer', function(assert) {
  indexPage.visit();

  andThen(function() {
    indexPage.siteFooter.clickAboutLink();
  });

  andThen(function() {
    assert.equal(currentURL(), '/about');
  });

  andThen(function() {
    indexPage.siteFooter.clickTeamLink();
  });

  andThen(function() {
    assert.equal(currentURL(), '/team');
  });
});
