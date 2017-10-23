import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index';

moduleForAcceptance('Acceptance | Sprite Map');

test('the application renders the sprite map', function(assert) {
  assert.expect(1);

  indexPage.visit();

  andThen(function() {
    assert.ok(indexPage.spriteMap.isVisible);
  });
});
