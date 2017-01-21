import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  set
} = Ember;

function setHandlers(context, { activateDonationsHandler = function() {} } = {}) {
  set(context, 'activateDonationsHandler', activateDonationsHandler);
}

moduleForComponent('donation-goals-activation', 'Integration | Component | donation goals activation', {
  integration: true,
  beforeEach() {
    setHandlers(this);
  }
});

test('it allows activating donations if canActivateDonations is true', function(assert) {
  assert.expect(2);

  function activateDonationsHandler() {
    assert.ok(true, 'Action was called when button was clicked');
  }

  setHandlers(this, { activateDonationsHandler });
  set(this, 'canActivateDonations', true);

  this.render(hbs`
    {{donation-goals-activation
      activateDonations=activateDonationsHandler
      canActivateDonations=canActivateDonations
    }}
  `);

  assert.equal(this.$('.activate-donations').length, 1, 'The "activate donations" button is rendered');

  this.$('.activate-donations').click();
});

test('it prevents activating donations if canActivateDonations is false', function(assert) {
  assert.expect(1);

  set(this, 'canActivateDonations', false);

  this.render(hbs`
    {{donation-goals-activation
      canActivateDonations=canActivateDonations
    }}
  `);

  assert.equal(this.$('.activate-donations').length, 0, 'The "activate donations" button is not rendered');
});
