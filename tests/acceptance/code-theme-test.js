import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index';

moduleForAcceptance('Acceptance | Code Theme');

test('Code theme class exists on the main container', function(assert) {
  assert.expect(1);

  indexPage.visit();

  andThen(function() {
    assert.ok(indexPage.isLightTheme, 'light class added to .main.container');
  });
});
