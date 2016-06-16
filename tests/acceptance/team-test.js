import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | team');

test('visiting /team', function(assert) {
  visit('/team');

  andThen(function() {
    assert.equal(currentURL(), '/team');
    assert.equal(find('.company h2').text().trim(), 'Our Team');
    assert.equal(find('.company li').length, 2);
    assert.equal(find('.contributors li').length, 13);
  });
});
