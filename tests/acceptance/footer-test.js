import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | footer');

test('can visit links from footer', function(assert) {
  visit('/');

  andThen(function() {
    click('.site-footer ul > li:eq(1) li:eq(0) a');
  });

  andThen(function() {
    assert.equal(currentURL(), '/about');
  });

  andThen(function() {
    click('.site-footer ul > li:eq(1) li:eq(1) a');
  });

  andThen(function() {
    assert.equal(currentURL(), '/team');
  });

  andThen(function() {
    click('.footer-logo');
  });

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
