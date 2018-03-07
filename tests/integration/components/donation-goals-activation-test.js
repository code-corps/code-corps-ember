import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import donationGoalsActivation from 'code-corps-ember/tests/pages/component/donation-goals-activation';

let page = PageObject.create(donationGoalsActivation);

function setHandlers(context, { activateDonationsHandler = function() {} } = {}) {
  set(context, 'activateDonationsHandler', activateDonationsHandler);
}

moduleForComponent('donation-goals-activation', 'Integration | Component | donation goals activation', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setHandlers(this);
  },
  afterEach() {
    page.removeContext();
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

  assert.ok(page.activateDonationsButton.isVisible, 'The "activate donations" button is rendered');

  page.activateDonationsButton.click();
});

test('it prevents activating donations if canActivateDonations is false', function(assert) {
  assert.expect(1);

  set(this, 'canActivateDonations', false);

  this.render(hbs`
    {{donation-goals-activation
      activateDonations=activateDonationsHandler
      canActivateDonations=canActivateDonations
    }}
  `);

  assert.notOk(page.activateDonationsButton.isVisible, 'The "activate donations" button is not rendered');
});
