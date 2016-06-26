import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | terms');

test('visiting /terms', function(assert) {
    visit('/terms');
    
    andThen(function() {
        assert.equal(currentURL(), '/terms');
        assert.equal(find('.terms-section h2').text().trim(), 'Terms Of Use');
        assert.equal(find('.terms-section').length, 21);
    });
});