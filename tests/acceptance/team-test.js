import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import teamPage from '../pages/team';

moduleForAcceptance('Acceptance | team');

test('visiting /team', function(assert) {
  teamPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/team');
    assert.equal(teamPage.company.header, 'Our Team');
    assert.equal(teamPage.company.items().count, 3);
    assert.equal(teamPage.contributors.header, 'Our Volunteers');
    assert.equal(teamPage.contributors.items().count, 29);
  });
});
