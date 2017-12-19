import { moduleFor, test } from 'ember-qunit';

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  needs: [
    'service:current-user',
    'service:flash-messages',
    'service:i18n',
    'service:loading-bar',
    'service:metrics',
    'service:onboarding',
    'service:router-scroll',
    'service:scheduler',
    'service:session',
    'service:socket'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
