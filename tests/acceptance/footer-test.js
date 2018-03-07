import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index';
import projectsPage from '../pages/projects';

moduleForAcceptance('Acceptance | footer');

test('can visit links from footer on index', function(assert) {
  indexPage.visit();

  andThen(function() {
    assert.equal(indexPage.siteFooter.columns.length, 4);
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

test('renders horizontal on smaller screens', function(assert) {
  indexPage.visit();

  andThen(function() {
    setBreakpoint('medium');
  });

  andThen(function() {
    assert.equal(indexPage.siteFooter.columns.length, 0);
    assert.equal(indexPage.siteFooter.rows.length, 6);
  });
});

test('renders horizontal on most pages', function(assert) {
  projectsPage.visit();

  setBreakpoint('full');

  andThen(function() {
    assert.equal(indexPage.siteFooter.columns.length, 0);
    assert.equal(indexPage.siteFooter.rows.length, 6);
  });
});
